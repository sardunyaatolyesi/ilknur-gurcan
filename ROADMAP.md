# İlknur Gürcan — Sanatçı Web Sitesi Yol Haritası

## Tamamlananlar ✅

### Altyapı
- Astro + Tailwind CSS kurulumu
- Tasarım sistemi (renk paleti, tipografi: Cormorant Garamond + Jost)
- Layout, Nav (scroll-aware şeffaf/opak geçiş), Footer bileşenleri

### Ana Sayfa `/`
- Hero bölümü (tam ekran eser fotoğrafı, sanatçı adı, slogan, CTA butonları)
- Sağ köşede yaklaşan etkinlikler paneli
- İstatistik bandı (koyu arka plan, altın rakamlar)
- Filtrelenebilir seçili eserler grid'i (Kafeler / Sokaklar / Figür)
- Hakkında kısa bölümü (fotoğraf + metin)
- Yaklaşan sergiler bölümü
  - Yılbaşı Sergisi — Sava Sanat Galerisi, 1–31 Ara 2026
  - Kişisel Sergi — Sava Sanat Galerisi, 9–24 Oca 2027
- CTA bölümü

### Eserler Galerisi `/eserler`
- 24 eser, 4'lü grid düzeni
- Kategori filtre butonları (Tümü / Kafeler / Sokaklar / Figür / Diğer)
- "Satıldı" etiketi ve gri filtre
- Eser sayacı

### İçerik
- 24 eser verisi (`src/data/eserler.ts`)
- Eser bilgileri için Excel şablonu (`Eserler.xlsx`)

---

## Yapılacaklar 🔧

### Sayfalar

#### Eser Detay Sayfası `/eserler/[slug]`
- [ ] Büyük resim görünümü
- [ ] Teknik bilgiler (boyut, yıl, teknik, fiyat)
- [ ] "Satın Al" butonu (İyzico entegrasyonu)
- [ ] "Bilgi İste" butonu (WhatsApp / e-posta)
- [ ] Oda görselleştirme (statik)
- [ ] İlgili eserler (aynı kategoriden 3 eser)

#### Hakkında `/hakkinda`
- [ ] Profesyonel fotoğraf
- [ ] Biyografi (mühendislik → Sardunya Atölyesi)
- [ ] Ödüller ve sergiler listesi
- [ ] Atölye fotoğrafları

#### Sergiler `/sergiler`
- [ ] Yaklaşan ve geçmiş sergiler listesi
- [ ] Her sergi: başlık, mekan, tarih, açıklama

#### İletişim `/iletisim`
- [ ] Formspree ile iletişim formu
- [ ] WhatsApp butonu
- [ ] Instagram linki
- [ ] E-posta adresi

### İçerik Güncellemeleri
- [ ] `Eserler.xlsx` doldurulduktan sonra `eserler.ts` gerçek verilerle güncellenmesi
- [ ] Her esere doğru kategori, isim, boyut, fiyat atanması
- [ ] Hero ve sanatçı fotoğraflarının güncellenmesi

### Entegrasyonlar
- [ ] Decap CMS kurulumu (`/admin` paneli)
  - `eserler` koleksiyonu
  - `sergiler` koleksiyonu
- [ ] İyzico ödeme entegrasyonu
- [ ] Formspree iletişim formu entegrasyonu

### Yayına Alma
- [ ] Netlify deploy kurulumu
- [ ] Alan adı bağlantısı (ilknurgurcan.com)
- [ ] Lighthouse performans ve SEO kontrolü

---

## Kapsam Dışı (Şimdilik)
- İngilizce dil seçeneği
- Blog / yazılar bölümü
- Baskı satışı (print-on-demand)
- Müzayede / teklif sistemi
- Müşteri hesabı / sipariş takibi
