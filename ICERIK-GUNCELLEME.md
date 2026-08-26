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

Sergiler Excel'de değil, doğrudan sayfa dosyalarında tutulur:

- Türkçe: `src/pages/sergiler.astro`
- İngilizce: `src/pages/en/exhibitions.astro`
- Ana sayfadaki "Yaklaşan Sergiler" bölümü: `src/pages/index.astro` ve `src/pages/en/index.astro`

Dosyaların en üstündeki listeleri düzenlemek yeterli. Bir serginin
geçmişe düşmesi için `yaklaşanSergiler` listesinden alıp `gecmisSergiler`
listesine taşıyın.

> Ay adlarını kısaltmayın: "Ara 2026" değil "Aralık 2026".

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

Çıktıda eser sayısı, satılan/satışta dağılımı ve hero eserler görünür.
Beklediğinizle uyuşuyor mu bakın. Uyarı satırı varsa okuyun.

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
