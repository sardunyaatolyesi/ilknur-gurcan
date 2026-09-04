# -*- coding: utf-8 -*-
"""
Sosyal medya önizlemeleri için küçültülmüş kopyalar üretir.

Neden: WhatsApp, LinkedIn gibi uygulamalar bağlantı önizlemesi üretirken
görseli indirir ve yaklaşık 300 KB üstündeki dosyaları çoğu zaman
göstermez. Sitede kullanılan tam çözünürlüklü görsellere dokunmadan,
yalnızca paylaşım için ayrı bir kopya üretiyoruz.

Çıktı: public/images/paylasim/ResimN.jpeg

Kullanım (proje kökünden):
    python scripts/paylasim-gorseli-uret.py
"""
import sys
from pathlib import Path

# Windows konsolu varsayılan olarak cp1254 kullanır; Türkçe olmayan
# karakterlerde (→ gibi) çökmemesi için çıktıyı UTF-8'e sabitle.
try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow kurulu değil.  Kurulum:  pip install Pillow")

try:
    import piexif                    # telif bilgisini kopyaya taşımak için
except ImportError:
    piexif = None
    print("NOT: piexif kurulu değil, paylaşım kopyalarına telif bilgisi taşınmayacak.")

KOK    = Path(__file__).resolve().parent.parent
KAYNAK = KOK / "public" / "images"
HEDEF  = KAYNAK / "paylasim"

UZUN_KENAR = 1080      # önizleme küçük gösterilir; bu fazlasıyla yeterli
KALITE     = 82
EN_DUSUK_KALITE = 72   # altına inince bozulma görünür olmaya başlıyor
HEDEF_KB   = 260       # WhatsApp'ın ~300 KB sınırının altında pay bırak


def telif_tasi(kaynak: Path, hedef: Path) -> None:
    """
    Kaynaktaki telif bilgisini kopyaya aktarır.

    Küçültme sırasında görsel yeniden kodlandığı için üstveri kaybolur;
    scripts/telif-bilgisi-ekle.py ile gömülen bilgi burada geri yazılmazsa
    paylaşım kopyaları telifsiz kalır.
    """
    if piexif is None:
        return
    try:
        exif = piexif.load(str(kaynak))
        exif.pop("thumbnail", None)      # küçültülmüş dosyaya uymaz
        exif["1st"] = {}
        piexif.insert(piexif.dump(exif), str(hedef))
    except Exception:
        pass                             # üstveri yoksa sessizce geç


def uret(kaynak: Path, hedef: Path) -> tuple[int, int, int]:
    """
    Hedef boyuta önce kaliteyi bir miktar düşürerek, yetmezse görseli
    küçülterek ulaşır. Kaliteyi dibe vurdurmak yerine boyut küçültmek
    gözle daha temiz sonuç verir.
    """
    kenar = UZUN_KENAR
    while True:
        with Image.open(kaynak) as im:
            im = im.convert("RGB")
            im.thumbnail((kenar, kenar), Image.LANCZOS)
            kalite = KALITE
            while True:
                im.save(hedef, "JPEG", quality=kalite, optimize=True, progressive=True)
                if hedef.stat().st_size <= HEDEF_KB * 1024:
                    telif_tasi(kaynak, hedef)
                    return hedef.stat().st_size, kalite, kenar
                if kalite <= EN_DUSUK_KALITE:
                    break
                kalite -= 5
        if kenar <= 720:                 # daha fazla küçültmeye gerek yok
            telif_tasi(kaynak, hedef)
            return hedef.stat().st_size, kalite, kenar
        kenar = int(kenar * 0.85)        # kaliteyi koru, ölçüyü düşür


def main() -> int:
    if not KAYNAK.exists():
        sys.exit(f"Klasör yok: {KAYNAK}")
    HEDEF.mkdir(exist_ok=True)

    dosyalar = sorted(KAYNAK.glob("Resim*.jpeg"),
                      key=lambda p: int("".join(c for c in p.stem if c.isdigit()) or 0))
    if not dosyalar:
        sys.exit("Kaynak görsel bulunamadı.")

    toplamOnce = toplamSonra = 0
    zorlananlar = []

    for f in dosyalar:
        toplamOnce += f.stat().st_size
        sonra, kalite, kenar = uret(f, HEDEF / f.name)
        toplamSonra += sonra
        if kalite < KALITE or kenar < UZUN_KENAR:
            zorlananlar.append(f"{f.name} (k{kalite}, {kenar}px, {sonra//1024}KB)")

    print(f"{len(dosyalar)} paylaşım görseli üretildi -> {HEDEF.relative_to(KOK)}")
    print(f"  Kaynak toplam : {toplamOnce/1024/1024:.1f} MB")
    print(f"  Paylaşım      : {toplamSonra/1024/1024:.1f} MB "
          f"(ortalama {toplamSonra//len(dosyalar)//1024} KB)")
    enBuyuk = max((HEDEF / f.name).stat().st_size for f in dosyalar)
    sinir = 300 * 1024
    print(f"  En büyük      : {enBuyuk//1024} KB "
          f"({'WhatsApp sınırının altında' if enBuyuk < sinir else 'SINIRI AŞIYOR'})")
    if zorlananlar:
        print(f"  Ek sıkıştırma gerekenler ({len(zorlananlar)}):")
        for z in zorlananlar:
            print(f"    {z}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
