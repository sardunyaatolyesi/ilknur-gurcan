# -*- coding: utf-8 -*-
"""
Eser görsellerine görünmez telif bilgisi (EXIF) gömer.

NE YAPAR: Dosyanın içine sanatçı adı, telif notu, eser adı ve site adresini
yazar. Windows'ta dosya özelliklerinde, Photoshop gibi programlarda görünür.
Dosya olduğu gibi kopyalanırsa bilgi onunla birlikte gider.

NE YAPMAZ: Görselin kaydedilmesini, kopyalanmasını veya paylaşılmasını
engellemez. Bir koruma değil, atıf bilgisidir. Ayrıca Instagram, Facebook ve
WhatsApp gibi platformlar yükleme sırasında görseli yeniden sıkıştırıp bu
bilgiyi siler.

ÖNEMLİ: Görsel verisi yeniden kodlanmaz. piexif yalnızca JPEG'in üstveri
bölümünü değiştirir; piksellere dokunmaz, dolayısıyla kalite kaybı olmaz.

Kullanım (proje kökünden):
    python scripts/telif-bilgisi-ekle.py            # önizleme
    python scripts/telif-bilgisi-ekle.py --uygula   # yaz
"""
import re
import sys
from datetime import date
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

try:
    import piexif
except ImportError:
    sys.exit("piexif kurulu değil.  Kurulum:  pip install piexif")

KOK      = Path(__file__).resolve().parent.parent
GORSELLER = KOK / "public" / "images"
TS       = KOK / "src" / "data" / "eserler.ts"

SANATCI = "İlknur Gürcan"
SITE    = "https://ilknurgurcan.com"
TELIF   = f"© {date.today().year} {SANATCI}. Tüm hakları saklıdır. / All rights reserved."


def eser_adlari() -> dict[str, str]:
    """Dosya adı -> eser adı eşlemesi (eserler.ts'ten)."""
    metin = TS.read_text(encoding="utf-8")
    harita = {}
    for satir in metin.splitlines():
        if not satir.strip().startswith("{ slug:"):
            continue
        ad = re.search(r"baslik: (?:'([^']*)'|\"([^\"]*)\")", satir)
        dosya = re.search(r"/images/(Resim\d+\.jpeg)", satir)
        if ad and dosya:
            harita[dosya.group(1)] = ad.group(1) or ad.group(2)
    return harita


def yaz(dosya: Path, eser_adi: str | None, uygula: bool) -> str:
    """Mevcut üstveriyi koruyarak telif alanlarını ekler."""
    try:
        exif = piexif.load(str(dosya))
    except Exception:
        exif = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": None}

    sifir = exif.setdefault("0th", {})
    sifir[piexif.ImageIFD.Artist]    = SANATCI.encode("utf-8")
    sifir[piexif.ImageIFD.Copyright] = TELIF.encode("utf-8")

    # Windows'un dosya özelliklerinde gösterdiği alanlar (UTF-16LE ister)
    utf16 = lambda s: s.encode("utf-16le") + b"\x00\x00"
    sifir[piexif.ImageIFD.XPAuthor] = utf16(SANATCI)

    if eser_adi:
        sifir[piexif.ImageIFD.ImageDescription] = eser_adi.encode("utf-8")
        sifir[piexif.ImageIFD.XPTitle]   = utf16(eser_adi)
        sifir[piexif.ImageIFD.XPSubject] = utf16(f"{eser_adi} — {SANATCI}")

    sifir[piexif.ImageIFD.XPComment] = utf16(SITE)

    if not uygula:
        return "önizleme"

    once = dosya.stat().st_size
    # insert(): yalnızca üstveri bölümünü değiştirir, görseli yeniden kodlamaz
    piexif.insert(piexif.dump(exif), str(dosya))
    return f"{once // 1024} KB -> {dosya.stat().st_size // 1024} KB"


def main() -> int:
    uygula = "--uygula" in sys.argv
    if not GORSELLER.exists():
        sys.exit(f"Klasör yok: {GORSELLER}")

    adlar = eser_adlari()
    dosyalar = sorted(GORSELLER.glob("Resim*.jpeg"),
                      key=lambda p: int("".join(c for c in p.stem if c.isdigit()) or 0))

    yazilan, adsiz = 0, []
    for f in dosyalar:
        ad = adlar.get(f.name)
        if not ad:
            adsiz.append(f.name)     # sitede kullanılmayan görsel
        yaz(f, ad, uygula)
        yazilan += 1

    print(f"{'YAZILDI' if uygula else 'ÖNİZLEME — yazılacak'}: {yazilan} görsel")
    print(f"  Sanatçı : {SANATCI}")
    print(f"  Telif   : {TELIF}")
    print(f"  Site    : {SITE}")
    print(f"  Eser adı eşleşen: {yazilan - len(adsiz)}")
    if adsiz:
        print(f"  Sitede kullanılmayan (eser adı yazılmadı): {adsiz}")
    if not uygula:
        print("\n  Yazmak için: python scripts/telif-bilgisi-ekle.py --uygula")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
