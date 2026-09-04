# -*- coding: utf-8 -*-
"""
Kaynak Excel dosyalarının yerini bulur.

Kaynak dosyalar (Eserler.xlsx, Sergiler.xlsx) OneDrive'da tutulur:

    OneDrive/Documents/İlknur/WebSitesi/

Kod deposu ise yerel diskte durur ve OneDrive'a taşınmaz: depo 11 binden
fazla dosya içeriyor (node_modules, .git) ve OneDrive bunları her kurulum
ve her derlemede senkronlamaya çalışıp hem yavaşlıyor hem dosya kilidi
çakışması üretiyor. Kodun yedeği zaten GitHub'da.

Bu yüzden Excel dosyaları depoda değil; yerleri burada çözülüyor.
"""
import os
import sys
from pathlib import Path

# OneDrive kök dizini ortam değişkeninden okunur; kullanıcı adı veya
# OneDrive kurulum yolu değişse de betik çalışmaya devam etsin diye
# "C:/Users/..." biçiminde sabit yol yazılmıyor.
ALT_YOL = Path("Documents") / "İlknur" / "WebSitesi"


def _adaylar(dosya_adi: str, depo_koku: Path) -> list[Path]:
    yollar = []
    for degisken in ("OneDrive", "OneDriveConsumer", "OneDriveCommercial"):
        kok = os.environ.get(degisken)
        if kok:
            aday = Path(kok) / ALT_YOL / dosya_adi
            if aday not in yollar:
                yollar.append(aday)
    # Eski konum (deponun bir üstü). Taşımanın yapılmadığı bir kopyada
    # betiğin yine de çalışması için korunuyor.
    yollar.append(depo_koku.parent / dosya_adi)
    return yollar


def excel_yolu(dosya_adi: str, depo_koku: Path) -> Path:
    """
    dosya_adi'nı sırayla OneDrive'da ve eski konumda arar.
    Bulamazsa nereye baktığını yazıp çıkar — sessizce boş veriyle
    devam edip yanlış bir eserler.ts üretmesindense durması iyidir.
    """
    yollar = _adaylar(dosya_adi, depo_koku)
    for yol in yollar:
        if yol.exists():
            return yol

    satirlar = "\n".join(f"       {y}" for y in yollar)
    sys.exit(f"HATA: {dosya_adi} bulunamadı. Bakılan yerler:\n{satirlar}\n"
             f"       Dosya OneDrive'da 'Documents/İlknur/WebSitesi/' altında olmalı.")
