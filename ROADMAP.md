# Yol Haritası

Son güncelleme: **26.08.2026**

Güncel yapılacaklar listesi OneDrive'daki `WebSitesi\Yapılacaklar-WebSitesi.xlsx` dosyasında tutulur;
bu belge genel resmi özetler.

---

## Tamamlananlar

### Altyapı
- Astro 6 + Tailwind CSS 4, TypeScript (strict)
- Tasarım sistemi: krem/mürekkep/altın paleti, Cormorant Garamond + Jost
- GitHub Pages'e otomatik yayın (her push'ta, GitHub Actions)
- Alan adı: **ilknurgurcan.com** (Cloudflare DNS)
- Excel → `eserler.ts` üretim betiği (`scripts/eserler-uret.py`)

### Sayfalar — Türkçe
- **Ana sayfa** — hero (rastgele eser, okunurluk için saydam bant),
  yaklaşan etkinlikler paneli, istatistik bandı, seçili eserler (rastgele 6,
  en fazla 1 satılmış), hakkında özeti, yaklaşan sergiler, iletişim çağrısı
- **Eserler** `/eserler` — 44 eser, çift filtre (satış durumu + kategori),
  yıla göre sıralı
- **Eser detayı** `/eserler/[slug]` — büyük görsel, büyüteç (yalnızca fareli
  cihazlarda), teknik künye, fiyat, satın alma/bilgi isteme, ilgili eserler
- **Hakkında** `/hakkinda` — biyografi, hocalar, sergi özeti
- **Sergiler** `/sergiler` — 2 yaklaşan, 18 geçmiş sergi
- **İletişim** `/iletisim` — WhatsApp, e-posta, Instagram, atölye adresi, form

### Sayfalar — İngilizce (`/en/`)
Türkçenin tamamı, **satın alma akışı hariç** (bilgi talebine yönlendirir).
Eser adları çevrildi; detay sayfasında Türkçe orijinali de gösteriliyor.
Menüde TR/EN geçişi aynı sayfada kalır.

### İçerik
- 44 eser, gerçek adlarıyla (Excel'den üretiliyor)
- 19 eserin çerçeveli fotoğrafı kırpılmış haliyle değiştirildi
- Eser adlarından türetilen adresler (`/eserler/aksam-servisi`)

### Entegrasyonlar
- **Web3Forms** — iletişim formu çalışıyor, spam koruması ve gönderim durumu var
- **Google Search Console** — mülk doğrulandı, sitemap gönderildi

### SEO
- Her sayfada title, description, canonical
- hreflang (TR ↔ EN), `x-default`
- Open Graph + Twitter Card, mutlak URL'lerle; 1200×630 paylaşım kapağı
- `sitemap-index.xml` (98 URL, dil karşılıkları dahil) ve `robots.txt`
- JSON-LD: VisualArtwork + Offer + BreadcrumbList (88 eser sayfası)

---

## Bekleyenler

### Öncelikli
- **Eser açıklamaları** — 44 eserin hiçbirinde açıklama yok. Hem ziyaretçiyle
  kurulan bağ hem arama sonuçları için en yüksek getirili iş.
  Yöntem: Excel'e "Açıklama" sütunu, taslaklar hazırlanıp sanatçı onayına sunulur.
- **Ana sayfa istatistikleri** — "20+ Yıllık Deneyim, 15 Sergi, 200+ Eser,
  8 Koleksiyon" rakamları yer tutucu. Doğrusu bekleniyor.
  (Not: sayfada 15 sergi yazıyor, Sergiler sayfasında 18 sergi listeleniyor.)
- **Sergi listesi** — karma ve eski sergilerin gözden geçirilmesi

### Öncelikli değil (gerekçeleriyle Excel'de)
- İyzico ödeme entegrasyonu — ön koşul: vergi mükellefiyeti durumu
- Görsel optimizasyonu — 13.6 MB toplam; kalite kontrolü gerektirir
- Mobilde tam ekran görüntüleyici (lightbox)
- Oda görselleştirme — ölçek doğruluğu sorunlu
- E-posta bülteni — KVKK ve İYS yükümlülüğü getirir
- Decap CMS (`/admin` paneli)

---

## Kapsam dışı
- Blog / yazılar bölümü
- Baskı satışı (print-on-demand)
- Müzayede / teklif sistemi
- Müşteri hesabı ve sipariş takibi
