# -*- coding: utf-8 -*-
"""
Haftalık kaynak kontrolü.

İki iş yapar:

  1. Excel dosyalarında değişiklik olmuş mu diye bakar. Olmuşsa neyin
     değiştiğini eser eser özetler ve mantık kontrollerinden geçirir.
  2. Fiyatı uzun süredir (varsayılan 90 gün) değişmemiş, satıştaki
     eserleri listeler.

Kullanım (proje kökünden):

    python scripts/haftalik-kontrol.py             # yalnızca bakar, hiçbir şeyi değiştirmez
    python scripts/haftalik-kontrol.py --yayinla   # kontrollerden geçerse derler ve yayına alır

DEĞİŞİKLİK YAPMAZ: --yayinla verilmediğinde üretilen dosyalar geri alınır,
çalışma dizini betik çalışmadan önceki hâline döner. Yayına alma ayrı ve
bilinçli bir adımdır; Excel'de yapılmış bir hatanın kimse bakmadan siteye
çıkmasını istemiyoruz (Ağustos 2026'da Excel'deki çift 'Durum' sütunu
yüzünden 21 satılmış eser satıştaymış gibi üretilmişti).

Çıkış kodları:
    0  değişiklik yok
   10  değişiklik var, kontroller geçti — onay bekliyor
   15  değişikliğin tek sebebi takvimin ilerlemesi (sergi başladı/bitti).
       Excel'de bir şey değişmemiş, onay aranmadan yayına alınabilir.
   20  değişiklik var ama mantık kontrolü takıldı
    1  hata
"""
import argparse
import re
import subprocess
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

KOK = Path(__file__).resolve().parent.parent
VERI = ["src/data/eserler.ts", "src/data/sergiler.ts"]

# Fiyatı bu kadar gündür değişmemiş eserler için uyar
ESKIME_GUN = 90

# Çıkış kodları
YOK, VAR, TARIH, TAKILDI, HATA = 0, 10, 15, 20, 1


# --------------------------------------------------------------------------
# Yardımcılar
# --------------------------------------------------------------------------

def git(*args: str, kontrol: bool = True) -> str:
    r = subprocess.run(["git", *args], cwd=KOK, capture_output=True,
                       encoding="utf-8", errors="replace")
    if kontrol and r.returncode != 0:
        sys.exit(f"HATA: git {' '.join(args)}\n{r.stderr.strip()}")
    return r.stdout


def baslik(metin: str) -> None:
    print()
    print(metin)
    print("-" * len(metin))


def eserleri_coz(kaynak: str) -> dict[str, dict]:
    """
    Üretilmiş eserler.ts içindeki her satırdan slug, fiyat, durum ve başlığı
    çıkarır. Dosyayı betik üretiyor, biçimi sabit: her eser tek satır.
    """
    sonuc: dict[str, dict] = {}
    for satir in kaynak.splitlines():
        s = satir.strip()
        if not s.startswith("{ slug:"):
            continue

        def alan(ad: str) -> str | None:
            m = re.search(rf"\b{ad}:\s*('(?:[^']*)'|\"(?:[^\"]*)\"|[^,}}]+)", s)
            return m.group(1).strip() if m else None

        slug = alan("slug")
        if not slug:
            continue
        slug = slug.strip("'\"")

        ham = alan("fiyat")
        if ham is None:
            fiyat: int | str = ""
        elif ham[:1] in "'\"":
            fiyat = ham.strip("'\"")            # galeri notu gibi metin
        else:
            try:
                fiyat = int(ham)
            except ValueError:
                fiyat = ham

        sonuc[slug] = {
            "fiyat": fiyat,
            "durum": (alan("durum") or "").strip("'\""),
            "baslik": (alan("baslik") or slug).strip("'\""),
            "hero": "hero: true" in s,
            "secili": "secili: true" in s,
        }
    return sonuc


def sergileri_coz(kaynak: str) -> dict[str, dict]:
    """
    Üretilmiş sergiler.ts'i okur. Sergilerin slug'ı yok, anahtar olarak başlık
    kullanılıyor: başlık değişirse fark 'çıkarıldı + yeni' olarak görünür.
    Yanıltıcı değil, sadece ayrıntısız.
    """
    sonuc: dict[str, dict] = {}
    liste = ""
    for satir in kaynak.splitlines():
        s = satir.strip()
        if s.startswith("export const devamEdenSergiler"):
            liste = "devam ediyor"
            continue
        if s.startswith("export const yaklasanSergiler"):
            liste = "yaklaşan"
            continue
        if s.startswith("export const gecmisSergiler"):
            liste = "geçmiş"
            continue
        if not s.startswith("{ baslik:"):
            continue

        def alan(ad: str) -> str:
            m = re.search(rf"\b{ad}:\s*('(?:[^']*)'|\"(?:[^\"]*)\")", s)
            return m.group(1).strip("'\"") if m else ""

        b = alan("baslik")
        if not b:
            continue
        sonuc[b] = {
            "liste": liste,
            "tur": alan("tur"),
            "mekan": alan("mekan"),
            "sehir": alan("sehir"),
            "tarih": alan("tarih"),
            "not": alan("not"),
        }
    return sonuc


def sergi_farki(onceki: dict[str, dict], simdiki: dict[str, dict]) -> list[str]:
    satirlar: list[str] = []
    for b in sorted(simdiki.keys() - onceki.keys()):
        e = simdiki[b]
        satirlar.append(f"  YENİ      {b} ({e['liste']}) — {e['tarih']}")
    for b in sorted(onceki.keys() - simdiki.keys()):
        satirlar.append(f"  ÇIKARILDI {b} — Excel'de silinmiş ya da 'Gizle' yapılmış olabilir")
    for b in sorted(onceki.keys() & simdiki.keys()):
        a, y = onceki[b], simdiki[b]
        for ad, etiket in (("liste", "liste"), ("tur", "tür"), ("mekan", "mekan"),
                           ("sehir", "şehir"), ("tarih", "tarih"), ("not", "not")):
            if a[ad] != y[ad]:
                satirlar.append(f"  {etiket:9} {b}: {a[ad] or '—'} → {y[ad] or '—'}")
    return satirlar


def sergi_kontrolleri(onceki: dict[str, dict], simdiki: dict[str, dict]) -> list[str]:
    uyari: list[str] = []

    if onceki and len(simdiki) < len(onceki) * 0.8:
        uyari.append(f"Sergi sayısı {len(onceki)} → {len(simdiki)}. Beşte birden fazlası "
                     f"kaybolmuş; Excel'de satır silinmiş ya da toplu 'Gizle' yapılmış olabilir.")

    # Takvim ileri akar: yaklaşan → devam → geçmiş. Ters yöndeki her geçiş
    # ancak Excel'de tarih değiştirilmişse olur ve büyük ihtimalle yıl hatasıdır.
    sira = {"yaklaşan": 0, "devam ediyor": 1, "geçmiş": 2}
    geri = [b for b in onceki.keys() & simdiki.keys()
            if sira.get(simdiki[b]["liste"], 9) < sira.get(onceki[b]["liste"], 9)]
    if geri:
        uyari.append(f"Sergi takvimde geriye gitti: {', '.join(geri)}. "
                     f"Tarih alanında yıl yanlış girilmiş olabilir.")

    for b, e in sorted(simdiki.items()):
        if not e["tarih"]:
            uyari.append(f"{b}: tarih alanı boş.")

    return uyari


def sadece_tarih_gecisi(eser_ozet: list[str],
                        onceki: dict[str, dict],
                        simdiki: dict[str, dict]) -> bool:
    """
    Değişikliğin tek sebebi takvimin ilerlemesi mi?

    Sergi durumu artık tarihten hesaplanıyor (sergiler-uret.py). Sergi bittiği
    gün Excel'de hiçbir şey değişmemiş olsa da üretilen dosya değişir. Bu
    durumda yayına almak güvenlidir: ortada yeni girilmiş bir veri yok,
    dolayısıyla yanlış girilmiş olma ihtimali de yok.

    Sergi eklenip çıkarılmışsa, herhangi bir alanı değişmişse ya da takvimde
    geriye gidiş varsa False döner — o zaman insan bakmalı.
    """
    if eser_ozet or onceki.keys() != simdiki.keys():
        return False

    sira = {"yaklaşan": 0, "devam ediyor": 1, "geçmiş": 2}
    ilerleyen = False
    for b in onceki:
        a, y = onceki[b], simdiki[b]
        if any(a[ad] != y[ad] for ad in ("tur", "mekan", "sehir", "tarih", "not")):
            return False
        if a["liste"] != y["liste"]:
            if sira.get(y["liste"], 9) <= sira.get(a["liste"], 9):
                return False          # geriye gidiş: takvimle açıklanamaz
            ilerleyen = True
    return ilerleyen


def fiyat_yaz(v) -> str:
    return f"{v:,} TL".replace(",", ".") if isinstance(v, int) else f'"{v}"'


# --------------------------------------------------------------------------
# 1. Değişiklik tespiti
# --------------------------------------------------------------------------

def calisma_dizini_temiz_mi() -> None:
    kirli = git("status", "--porcelain", "--", *VERI).strip()
    if kirli:
        print("DURDURULDU: üretilen veri dosyalarında kaydedilmemiş değişiklik var.")
        print(kirli)
        print("\nBetik bu dosyaları üretip karşılaştırıyor; üzerine yazarsa")
        print("kaydedilmemiş bir şey kaybolabilir. Önce bunları commit'leyin ya da")
        print("'git checkout -- src/data/' ile geri alın.")
        sys.exit(HATA)


def uret() -> None:
    for betik in ("eserler-uret.py", "sergiler-uret.py"):
        r = subprocess.run([sys.executable, f"scripts/{betik}"], cwd=KOK,
                           capture_output=True, encoding="utf-8", errors="replace")
        if r.returncode != 0:
            print(f"HATA: scripts/{betik} çalışmadı.\n{r.stdout}\n{r.stderr}")
            sys.exit(HATA)


def degisen_dosyalar() -> list[str]:
    return [s for s in git("diff", "--name-only", "--", *VERI).split() if s]


def eser_farki(onceki: dict[str, dict], simdiki: dict[str, dict]) -> list[str]:
    satirlar: list[str] = []

    for slug in simdiki.keys() - onceki.keys():
        satirlar.append(f"  YENİ      {simdiki[slug]['baslik']} — {fiyat_yaz(simdiki[slug]['fiyat'])}")
    for slug in onceki.keys() - simdiki.keys():
        satirlar.append(f"  ÇIKARILDI {onceki[slug]['baslik']}")

    for slug in sorted(onceki.keys() & simdiki.keys()):
        a, b = onceki[slug], simdiki[slug]
        for ad, etiket in (("fiyat", "fiyat"), ("durum", "durum"),
                           ("baslik", "ad"), ("hero", "hero"), ("secili", "seçili")):
            if a[ad] != b[ad]:
                eski = fiyat_yaz(a[ad]) if ad == "fiyat" else a[ad]
                yeni = fiyat_yaz(b[ad]) if ad == "fiyat" else b[ad]
                satirlar.append(f"  {etiket:9} {b['baslik']}: {eski} → {yeni}")
    return satirlar


# --------------------------------------------------------------------------
# 2. Mantık kontrolleri
# --------------------------------------------------------------------------

def kontroller(onceki: dict[str, dict], simdiki: dict[str, dict]) -> list[str]:
    """
    Şüpheli görünen değişiklikleri döndürür. Boş liste = her şey olağan.
    Amaç hata yakalamak değil, 'bu kadarı elle yapılmış olamaz' demek.
    """
    uyari: list[str] = []

    if onceki and len(simdiki) < len(onceki) * 0.8:
        uyari.append(f"Eser sayısı {len(onceki)} → {len(simdiki)}. "
                     f"Beşte birden fazlası kaybolmuş; Excel'de satır silinmiş olabilir.")

    donen = [simdiki[s]["baslik"] for s in onceki.keys() & simdiki.keys()
             if onceki[s]["durum"] == "satildi" and simdiki[s]["durum"] == "satilabilir"]
    if len(donen) > 3:
        uyari.append(f"{len(donen)} eser 'satıldı'dan 'satılabilir'e döndü: "
                     f"{', '.join(donen[:5])}{'…' if len(donen) > 5 else ''}. "
                     f"Ağustos 2026'daki 'Durum' sütunu hatası tam olarak böyle görünmüştü.")

    for s in sorted(onceki.keys() & simdiki.keys()):
        a, b = onceki[s]["fiyat"], simdiki[s]["fiyat"]
        if isinstance(a, int) and isinstance(b, int) and a > 0 and b > 0:
            if b > a * 3 or b < a / 3:
                uyari.append(f"{simdiki[s]['baslik']}: fiyat {fiyat_yaz(a)} → {fiyat_yaz(b)}. "
                             f"Üç kattan fazla değişmiş, basamak hatası olabilir.")

    if simdiki and not any(e["hero"] for e in simdiki.values()):
        uyari.append("Hiç hero eseri yok; ana sayfanın arka planı boş kalır.")
    if simdiki and not any(e["secili"] for e in simdiki.values()):
        uyari.append("Hiç seçili eser yok; ana sayfadaki seçili eserler bölümü boşalır.")

    for s, e in sorted(simdiki.items()):
        if not e["baslik"] or e["baslik"] == s:
            uyari.append(f"{s}: başlık boş görünüyor.")

    return uyari


# --------------------------------------------------------------------------
# 3. Fiyatı eskimiş eserler
# --------------------------------------------------------------------------

def son_fiyat_degisimleri() -> tuple[dict[str, date], date]:
    """
    eserler.ts'in git geçmişini eskiden yeniye tarayıp her eserin fiyatının
    en son ne zaman değiştiğini bulur.

    Deponun başladığı tarihten öncesi bilinmiyor. O tarihten beri hiç
    değişmemiş fiyatlar için döndürülen tarih bir ALT SINIRDIR — fiyat
    gerçekte daha eski olabilir. İkinci dönüş değeri bu sınırı verir.
    """
    ham = git("log", "--follow", "--reverse", "--format=%H %ad",
              "--date=short", "--", "src/data/eserler.ts").strip()
    if not ham:
        return {}, date.today()

    kayitlar = [s.split(None, 1) for s in ham.splitlines() if s.strip()]
    son: dict[str, date] = {}
    onceki: dict[str, int | str] = {}
    ilk_tarih = datetime.strptime(kayitlar[0][1], "%Y-%m-%d").date()

    for sha, tarih_metni in kayitlar:
        tarih = datetime.strptime(tarih_metni, "%Y-%m-%d").date()
        try:
            icerik = git("show", f"{sha}:src/data/eserler.ts", kontrol=False)
        except SystemExit:
            continue
        if not icerik:
            continue
        for slug, e in eserleri_coz(icerik).items():
            if slug not in onceki or onceki[slug] != e["fiyat"]:
                son[slug] = tarih
                onceki[slug] = e["fiyat"]

    return son, ilk_tarih


def eskimis_fiyatlar(simdiki: dict[str, dict]) -> tuple[list[str], list[str]]:
    son, ilk_tarih = son_fiyat_degisimleri()
    bugun = date.today()
    esik = bugun - timedelta(days=ESKIME_GUN)

    eskiyen: list[tuple[int, str]] = []
    atlanan: list[str] = []

    for slug, e in simdiki.items():
        if e["durum"] != "satilabilir":
            continue
        if not isinstance(e["fiyat"], int) or e["fiyat"] <= 0:
            atlanan.append(e["baslik"])          # galeri notu vb., sayısal fiyat yok
            continue
        d = son.get(slug)
        if d is None or d > esik:
            continue
        gun = (bugun - d).days
        alt_sinir = " (en az)" if d == ilk_tarih else ""
        eskiyen.append((gun, f"  {gun:>4} gün{alt_sinir}  {e['baslik']} — {fiyat_yaz(e['fiyat'])}"))

    eskiyen.sort(reverse=True)
    return [s for _, s in eskiyen], sorted(atlanan)


# --------------------------------------------------------------------------
# Yayına alma
# --------------------------------------------------------------------------

def yayinla(ozet: list[str]) -> None:
    # SERGI_BUGUN ile üretilmiş bir dosya sahte bir tarihe dayanır ve asla
    # yayına girmemeli. sergiler-uret.py böyle bir dosyaya işaret bırakıyor.
    for yol in VERI:
        icerik = (KOK / yol).read_text(encoding="utf-8")
        if "SAHTE TARIHLE URETILDI" in icerik:
            print(f"DURDURULDU: {yol} sahte bir tarihle (SERGI_BUGUN) üretilmiş.")
            print("Bu dosya yalnızca önizleme içindir. SERGI_BUGUN olmadan")
            print("yeniden üretip tekrar deneyin.")
            sys.exit(HATA)

    r = subprocess.run(["npm", "run", "build"], cwd=KOK, capture_output=True,
                       encoding="utf-8", errors="replace", shell=True)
    if r.returncode != 0:
        print("HATA: npm run build başarısız. Yayına alınmadı.")
        print(r.stdout[-2000:])
        sys.exit(HATA)
    print("  npm run build tamam.")

    git("add", "--", *VERI)
    mesaj = ("content: Excel'den güncelleme\n\n"
             + "\n".join(s.strip() for s in ozet[:20])
             + "\n\nscripts/haftalik-kontrol.py --yayinla ile üretildi.\n")
    r = subprocess.run(["git", "commit", "-m", mesaj], cwd=KOK,
                       capture_output=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        print("HATA: commit yapılamadı.\n" + r.stderr)
        sys.exit(HATA)
    git("push", "origin", "main")
    print("  GitHub'a gönderildi. Site 2-3 dakika içinde güncellenir.")


# --------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser(description="Haftalık kaynak kontrolü")
    ap.add_argument("--yayinla", action="store_true",
                    help="kontrollerden geçerse derle, commit'le ve GitHub'a gönder")
    args = ap.parse_args()

    calisma_dizini_temiz_mi()

    onceki = eserleri_coz(git("show", "HEAD:src/data/eserler.ts"))
    onceki_s = sergileri_coz(git("show", "HEAD:src/data/sergiler.ts"))

    uret()
    degisen = degisen_dosyalar()
    simdiki = eserleri_coz((KOK / "src/data/eserler.ts").read_text(encoding="utf-8"))
    simdiki_s = sergileri_coz((KOK / "src/data/sergiler.ts").read_text(encoding="utf-8"))

    print(f"Haftalık kontrol — {date.today():%d.%m.%Y}")

    # --- Değişiklik ---
    if not degisen:
        baslik("1. Kaynak dosyalar")
        print("  Değişiklik yok. Site Excel ile uyumlu.")
        sonuc = YOK
        ozet: list[str] = []
        uyarilar: list[str] = []
    else:
        eser_ozet = eser_farki(onceki, simdiki)
        sergi_ozet = sergi_farki(onceki_s, simdiki_s)
        ozet = eser_ozet + sergi_ozet
        uyarilar = kontroller(onceki, simdiki) + sergi_kontrolleri(onceki_s, simdiki_s)

        baslik("1. Kaynak dosyalar — DEĞİŞİKLİK VAR")
        print("  Değişen: " + ", ".join(degisen))
        if eser_ozet:
            print("\n  Eserler.xlsx:")
            for s in eser_ozet:
                print(s)
        if sergi_ozet:
            print("\n  Sergiler.xlsx:")
            for s in sergi_ozet:
                print(s)
        if not ozet:
            print("\n  Üretilen dosya değişti ama içerik farkı çıkarılamadı;")
            print("  'git diff src/data/' ile bakın.")

        baslik("2. Mantık kontrolleri")
        if uyarilar:
            for u in uyarilar:
                print(f"  TAKILDI  {u}")
            sonuc = TAKILDI
        elif sadece_tarih_gecisi(eser_ozet, onceki_s, simdiki_s):
            print("  Tümü geçti.")
            print("\n  Değişikliğin tek sebebi takvimin ilerlemesi: Excel'de hiçbir şey")
            print("  değişmemiş, yalnızca serginin durumu tarihe göre güncellenmiş.")
            print("  Yanlış veri girme riski yok; onay aranmadan yayına alınabilir.")
            sonuc = TARIH
        else:
            print("  Tümü geçti.")
            sonuc = VAR

    # --- Fiyat eskimesi ---
    eskiyen, atlanan = eskimis_fiyatlar(simdiki)
    baslik(f"3. {ESKIME_GUN} gündür fiyatı değişmemiş, satıştaki eserler")
    if eskiyen:
        for s in eskiyen:
            print(s)
        print(f"\n  Toplam {len(eskiyen)} eser. '(en az)' işareti, deponun başladığı")
        print("  tarihten beri değişmediğini gösterir; fiyat daha da eski olabilir.")
    else:
        print("  Yok.")
    if atlanan:
        print(f"\n  Sayısal fiyatı olmadığı için bakılmayan {len(atlanan)} eser: "
              + ", ".join(atlanan[:6]) + ("…" if len(atlanan) > 6 else ""))

    # --- Sonuç ---
    baslik("Sonuç")
    if sonuc == YOK:
        print("  Yapılacak bir şey yok.")
    elif sonuc == TAKILDI:
        print("  Değişiklik var ama mantık kontrolleri takıldı.")
        print("  Yukarıdaki uyarıları inceleyip Excel'i düzeltin, sonra tekrar çalıştırın.")
    elif args.yayinla:
        print("  Kontroller geçti, yayına alınıyor...")
        yayinla(ozet)
        return sonuc
    elif sonuc == TARIH:
        print("  Sergi takvimi ilerlemiş. Onay gerekmiyor, yayına alınabilir:")
        print("  python scripts/haftalik-kontrol.py --yayinla")
    else:
        print("  Değişiklik yayına HAZIR ama alınmadı.")
        print("  Onaylıyorsanız:  python scripts/haftalik-kontrol.py --yayinla")

    # Yayınlanmadıysa üretilen dosyaları geri al: çalışma dizini
    # betik çalışmadan önceki hâline dönsün.
    if degisen:
        git("checkout", "--", *VERI)
        print("\n  (Üretilen dosyalar geri alındı; çalışma dizinine dokunulmadı.)")
    return sonuc


if __name__ == "__main__":
    sys.exit(main())
