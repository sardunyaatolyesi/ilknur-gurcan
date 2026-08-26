# İçerik Güncelleme Rehberi

Bu belge, siteyi güncel tutmak için gereken işleri anlatır. Çoğu iş Excel
üzerinden yapılır; kod yazmak gerekmez.

---

## Eserler

Eserlerin tek kaynağı `SardunyaWebPage/Eserler.xlsx` dosyasıdır.
Site verisi (`src/data/eserler.ts`) bu dosyadan **otomatik üretilir**;
o dosyayı elle düzenlemeyin, yaptığınız değişiklik bir sonraki üretimde silinir.

### Excel sütunları

| Sütun | Açıklama |
| :-- | :-- |
| Resim Adı | İç kullanım için etiket |
| **Dosya Adı** | `public/images/` içindeki dosya (ör. `Resim12.jpeg`) |
| **Boyutlar** | `40 x 60` biçiminde, santimetre |
| **Yıl** | Dört haneli |
| **Kategori** | `kafeler`, `sokaklar`, `figur`, `portre`, `diger` — küçük harf |
| **Fiyat (TL)** | Sayı yazın. `0` = satıldı. Metin de yazılabilir (ör. galeri notu) |
| **Durum** (G) | `Satılabilir` veya `Satıldı` |
| Seçili Resim mi? | `Seçili Resim` yazarsanız ana sayfada çıkabilir |
| Hero Resmi mi? | `Hero` yazarsanız ana sayfa arka planında çıkabilir |
| **Yayınlansın mı?** | `Evet` değilse eser siteye hiç girmez |
| Durum (K) | Serbest not alanı, siteye yansımaz |
| Önerilen İsim | Öneri sütunu |
| Alternatifler | Öneri sütunu |
| **Onaylanan İsim** | Sitede görünen Türkçe ad. Boş bırakılamaz |
| **İngilizce İsim** | Sitede görünen İngilizce ad |

> **Not:** G ve K sütunlarının ikisi de "Durum" başlığını taşıyor.
> Betik soldakini (G) kullanır. Karışıklığı önlemek için K sütununun
> başlığını "Notlar" olarak değiştirebilirsiniz; betik yine çalışır.

### Yeni eser ekleme

1. Fotoğrafı `public/images/` klasörüne koyun (`Resim50.jpeg` gibi)
2. Excel'e yeni satır ekleyin, yukarıdaki **kalın** sütunları doldurun
3. `Yayınlansın mı?` sütununa `Evet` yazın
4. Excel'i **kaydedin ve kapatın** (açıkken betik yazamaz)
5. Aşağıdaki "Değişikliği yayına alma" adımlarını izleyin

### Fiyat veya satış durumu değiştirme

Excel'de ilgili hücreyi değiştirin, kaydedin, "Değişikliği yayına alma"yı izleyin.
Bir eser satıldığında: `Durum` → `Satıldı`, `Fiyat` → `0`.

### Eseri siteden kaldırma

Satırı silmeyin — `Yayınlansın mı?` sütununu `Hayır` yapın.
Böylece kayıt durur ama sitede görünmez.

---

## Sergiler

Sergilerin kaynağı `SardunyaWebPage/Sergiler.xlsx` dosyasıdır.
`src/data/sergiler.ts` bundan otomatik üretilir; elle düzenlemeyin.

### Excel sütunları

| Sütun | Açıklama |
| :-- | :-- |
| **Sergi Adı** | Sitede görünen ad |
| **Tür** | `Kişisel`, `Karma`, `Fuar`, `Festival`, `Çalıştay` |
| Mekan | Galeri/kurum adı |
| Şehir | |
| **Başlangıç Tarihi** | `11.12.2026` biçiminde, ya da yalnızca yıl: `2018` |
| Bitiş Tarihi | Aynı biçim; tek günlükse boş bırakın |
| Dönem (kısa) | `2011–12` gibi yıl aralıkları için |
| **Durum** | `Yaklaşan` veya `Geçmiş` |
| Notlar | Ödül gibi ek bilgi; sitede altın renkli görünür |
| **Göster/Gizle** | `Gizle` yazarsanız sergi listeye çıkmaz |

### Sık yapılan işler

**Yeni sergi:** Satır ekleyin, `Durum` sütununa `Yaklaşan` yazın.

**Sergi bitti:** `Durum` sütununu `Geçmiş` yapın. Sayfada otomatik olarak
üst bölümden alt listeye geçer.

**Listeyi sadeleştirme:** `Göster/Gizle` sütununa `Gizle` yazın. Kayıt Excel'de
kalır, sitede görünmez. Şu an 9 karma sergi bu şekilde gizli; sayfada bunun
yerine "çok sayıda karma sergide eser sergilemiştir" ifadesi var.

**Sergi adının İngilizcesi:** `scripts/sergiler-uret.py` içindeki `AD_EN`
sözlüğünde tutulur. Yeni bir sergi eklerseniz betik uyarı verir ve İngilizce
sayfada Türkçe ad görünür — sözlüğe eklemek yeterli.

> Ay adları tarihten otomatik üretilir ve tam yazılır ("Aralık 2026").
> Tarih hücresinde `011.12.2026` gibi üç haneli gün olursa betik durur;
> hangi günün kastedildiği belirsiz olduğu için tahmin etmez.

---

## Diğer içerikler

| Ne | Nerede |
| :-- | :-- |
| Hero sloganı | `src/pages/index.astro` ve `en/index.astro` |
| Hakkında metni | `src/pages/hakkinda.astro` ve `en/about.astro` |
| Sanatçı fotoğrafı | `public/images/artist.jpg` (aynı adla değiştirin) |
| İletişim bilgileri | `src/pages/iletisim.astro`, `en/contact.astro`, `src/components/Footer.astro` |
| Menü ve buton metinleri | `src/i18n/ui.ts` |
| Paylaşım kapağı | `public/og-image.jpg` (1200×630) |

---

## Değişikliği yayına alma

Excel'i kaydedip **kapattıktan** sonra, proje klasöründe sırayla:

```bash
python scripts/eserler-uret.py
```

```bash
python scripts/sergiler-uret.py
```

(Yalnızca değiştirdiğiniz dosyanın betiğini çalıştırmanız yeterli.)

Çıktıda eser/sergi sayıları ve dağılımlar görünür. Beklediğinizle uyuşuyor mu
bakın. Uyarı satırı varsa okuyun.

```bash
npm run build
```

Hata vermemeli. "98 page(s) built" gibi bir satırla biter.

```bash
git add -A
git commit -m "Eser güncellemesi"
git push
```

Push'tan 2–3 dakika sonra site güncellenir.
Durumu şuradan izleyebilirsiniz:
[github.com/sardunyaatolyesi/ilknur-gurcan/actions](https://github.com/sardunyaatolyesi/ilknur-gurcan/actions)

Tarayıcıda eski hali görüyorsanız **Ctrl+Shift+R** ile yenileyin.

---

## Dikkat edilecekler

**Silinmemesi gerekenler**
`public/googlec519ece89d05b7c4.html` — Google Search Console doğrulaması.
Silinirse site sahipliği düşer.

**Görsel boyutu**
Fotoğraflar 500 KB'ın altında olsun. Şu an bir dosya 1.1 MB ve sayfa
ağırlığını artırıyor. Uzun kenarı 1600 pikseli geçmesin.

**Eser adı değiştirmek adresi değiştirir**
`Onaylanan İsim` değişirse eserin adresi de değişir
(`Akşam Servisi` → `/eserler/aksam-servisi`). Eser yayındayken adını
değiştirirseniz eski bağlantı kırılır. Gerekirse `astro.config.mjs`
içindeki `redirects` bölümüne eski adresi ekleyin.

**Excel açıkken betik çalışmaz**
"Permission denied" hatası alırsanız Excel'i kapatıp tekrar deneyin.
