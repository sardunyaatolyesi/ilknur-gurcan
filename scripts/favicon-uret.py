# -*- coding: utf-8 -*-
"""
public/favicon.svg ve public/favicon.ico üretir.

Tasarım: koyu yuvarlak kare üzerinde krem 'İG' monogramı. Renkler sitenin
paletinden (src/styles/global.css @theme): ink #1C1A18, cream #FAF8F5.

Harfler SVG'de **yola çevriliyor**; ikon hiçbir yazı tipine bağımlı olmadan
her tarayıcıda aynı görünsün diye. Kaynak yazı tipi Georgia Bold — sitenin
serif'i Cormorant Garamond yalnızca web fontu olarak var, yerelde kurulu değil;
Georgia ona en yakın ve her Windows'ta bulunuyor.

Kullanım (proje kökünden):
    python scripts/favicon-uret.py

Normalde bir daha çalıştırmak gerekmez; dosyalar depoda duruyor. Tasarım
değişirse buradan üretilir, ikisi elle düzenlenmez.
"""
import sys
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.boundsPen import BoundsPen
    from fontTools.pens.transformPen import TransformPen
    from fontTools.misc.transform import Transform
except ImportError:
    sys.exit("fontTools kurulu değil.  Kurulum:  pip install fonttools")

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Pillow kurulu değil.  Kurulum:  pip install Pillow")

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

KOK   = Path(__file__).resolve().parent.parent
HEDEF = KOK / "public"
FONT  = Path(r"C:\Windows\Fonts\georgiab.ttf")
METIN = "İG"

INK, CREAM     = "#1C1A18", "#FAF8F5"
INK_T, CREAM_T = (28, 26, 24, 255), (250, 248, 245, 255)

BOY     = 256      # viewBox kenarı
YARICAP = 56       # köşe yuvarlaklığı (0.22 × BOY)
ORAN    = 0.46     # harflerin tuvale göre yüksekliği
ICO_BOYUTLARI = [16, 24, 32, 48, 64, 128, 256]


def harf_yolu() -> str:
    """METIN'i tek bir SVG path verisine çevirir ve tuvale ortalar."""
    font = TTFont(FONT)
    gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]

    adlar = []
    for ch in METIN:
        if ord(ch) not in cmap:
            sys.exit(f"HATA: {ch!r} ({hex(ord(ch))}) yazı tipinde yok: {FONT}")
        adlar.append(cmap[ord(ch)])

    # Harfleri yan yana diz, mürekkep sınırlarını ölç
    sinir = BoundsPen(gs)
    x = 0
    for ad in adlar:
        gs[ad].draw(TransformPen(sinir, Transform().translate(x, 0)))
        x += hmtx[ad][0]
    if sinir.bounds is None:
        sys.exit("HATA: harflerin sınırı hesaplanamadı.")
    x0, y0, x1, y1 = sinir.bounds

    olcek = (BOY * ORAN) / (y1 - y0)
    dx = (BOY - (x1 - x0) * olcek) / 2 - x0 * olcek
    dy = (BOY + (y1 - y0) * olcek) / 2 + y0 * olcek   # SVG'de y ekseni aşağı

    # Ondalıkları kırp; yol verisi gereksiz yere şişmesin
    kalem = SVGPathPen(gs, ntos=lambda v: f"{round(v, 2):g}")
    x = 0
    for ad in adlar:
        gs[ad].draw(TransformPen(
            kalem, Transform(olcek, 0, 0, -olcek, dx, dy).translate(x, 0)))
        x += hmtx[ad][0]
    return kalem.getCommands()


def ico_karesi(boy: int) -> Image.Image:
    """Aynı tasarımı raster olarak çizer (.ico için)."""
    img = Image.new("RGBA", (boy, boy), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, boy - 1, boy - 1],
                        radius=int(boy * YARICAP / BOY), fill=INK_T)
    f = ImageFont.truetype(str(FONT), int(boy * 0.52))
    kutu = d.textbbox((0, 0), METIN, font=f)
    g, y = kutu[2] - kutu[0], kutu[3] - kutu[1]
    d.text(((boy - g) / 2 - kutu[0], (boy - y) / 2 - kutu[1] + boy * 0.02),
           METIN, font=f, fill=CREAM_T)
    return img


def main() -> int:
    if not FONT.exists():
        sys.exit(f"Yazı tipi bulunamadı: {FONT}")

    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOY} {BOY}">\n'
           f'  <!-- İlknur Gürcan monogramı. Harfler yola çevrildi; yazı tipi\n'
           f'       gerekmiyor. Üretim: python scripts/favicon-uret.py -->\n'
           f'  <rect width="{BOY}" height="{BOY}" rx="{YARICAP}" fill="{INK}"/>\n'
           f'  <path d="{harf_yolu()}" fill="{CREAM}"/>\n'
           f'</svg>\n')
    (HEDEF / "favicon.svg").write_text(svg, encoding="utf-8")

    ico_karesi(256).save(HEDEF / "favicon.ico", format="ICO",
                         sizes=[(b, b) for b in ICO_BOYUTLARI])

    print("Favicon üretildi:")
    for ad in ("favicon.svg", "favicon.ico"):
        print(f"  public/{ad:14} {(HEDEF / ad).stat().st_size:>6} bayt")
    return 0


if __name__ == "__main__":
    sys.exit(main())
