# CLAUDE.md

Claude Code (claude.ai/code) bu depoda çalışırken bu dosyadaki notlara uyar.

## Komutlar

Tümü `ilknur-gurcan/` kökünden:

| Komut | Ne yapar |
| :-- | :-- |
| `npm install` | Bağımlılıkları kurar |
| `npm run dev` | Yerel sunucu, `localhost:4321` |
| `npm run build` | `dist/` üretir (98 sayfa) |
| `npm run preview` | Üretilmiş siteyi yerelde açar |
| `npm run astro check` | `.astro` dosyalarında tip denetimi |
| `python scripts/eserler-uret.py` | `Eserler.xlsx` → `src/data/eserler.ts` |
| `python scripts/haftalik-kontrol.py` | Excel değişmiş mi + fiyatı eskiyen eserler (yayına almaz) |
| `python scripts/haftalik-kontrol.py --yayinla` | Kontroller geçerse derler, commit'ler, push'lar |

Test paketi ve lint betiği yok. Node.js ≥ 22.12 gerekir (Astro 6 şartı).

**Dev sunucusu:** Yenisini başlatmadan önce çalışanı durdurun; birikirse
port 4321 dolar. Doğrulama için `preview_start` yerine mevcut sunucuya
`navigate` etmek yeterli.

## Mimari

Astro 6 statik site (SSG), Tailwind CSS 4 (`@tailwindcss/vite`, ayrı
`tailwind.config.js` yok — tema değişkenleri `src/styles/global.css` içindeki
`@theme` bloğunda: `ink`, `cream`, `gold`, `warm`, `muted`, `soft`).
Arayüz metinleri Türkçe ve İngilizce.

### Veri akışı

```
Eserler.xlsx  →  scripts/eserler-uret.py  →  src/data/eserler.ts
```

Kaynak Excel dosyaları **depoda değil, OneDrive'da**:
`%OneDrive%/Documents/İlknur/WebSitesi/`. Yerlerini `scripts/kaynak.py`
çözer (ortam değişkeninden; sabit yol yazılmaz). Depo yerel diskte kalır —
OneDrive'a konursa `node_modules` ve `.git` senkronizasyonu çakışma üretir;
kodun yedeği zaten GitHub'da.

`src/data/eserler.ts` **otomatik üretilir; elle düzenlemeyin.** İçerik
değişikliği Excel'de yapılır, betik yeniden çalıştırılır. Betik `Eser` tipini,
`eserler` dizisini ve `formatFiyat()` yardımcısını da yazar.

Excel'de **`Durum` başlığı iki sütunda** var (G: satış durumu, K: not).
Betik ilk sütunu (G) kullanır ve uyarı basar. Sütunları başlık adıyla bulur,
sıra değişebilir.

### Haftalık kontrol

`scripts/haftalik-kontrol.py` üretim betiklerini çalıştırır, çıktıyı git'teki
sürümle karşılaştırır, mantık kontrollerinden geçirir ve **ürettiği dosyaları
geri alır**. Çalışma dizinine dokunmaz; yayına alma `--yayinla` ile ayrı adımdır.

Her iki kaynağı da kapsar: `Eserler.xlsx` ve `Sergiler.xlsx`.

Eser kontrolleri (`kontroller()`): eser sayısında %20'den fazla düşüş, üçten
fazla satıldı→satılabilir dönüşü (Ağustos 2026'daki `Durum` sütunu hatasının
imzası), üç kattan fazla fiyat sıçraması, hero/seçili eserin sıfırlanması,
boş başlık.

Sergi kontrolleri (`sergi_kontrolleri()`): sergi sayısında %20'den fazla düşüş
(toplu `Gizle` ya da silinmiş satır), geçmiş→yaklaşan geri dönüşü (tarihte yıl
hatası), boş tarih. Sergilerin slug'ı yok; fark başlık anahtarıyla çıkarılıyor,
başlık değişirse "çıkarıldı + yeni" olarak görünür.

Fiyat geçmişi ayrı bir dosyada tutulmaz; `eserler.ts`'in git geçmişinden
çıkarılır. Deponun başlangıcı (2026-08-24) öncesi bilinmediği için o tarihe
dayanan süreler **alt sınırdır** ve raporda "(en az)" diye işaretlenir.

Zamanlanmış görev: `sardunya-haftalik-kontrol`, pazartesi 09:00, yerelde çalışır
(Excel OneDrive'da olduğu için bulut ajanı bu işi yapamaz).

### Çoklu dil

- Türkçe kök dizinde (`/eserler`), İngilizce `/en/` altında (`/en/works`)
- Astro'nun i18n eklentisi **kullanılmıyor** — düz klasör yapısı tercih edildi
- `src/i18n/ui.ts`: metin sözlüğü, `dilBul()`, `ceviri()`, `digerDilYolu()`
- Eser slug'ları iki dilde **aynı**; dil değiştirici böylece aynı sayfada kalır
- Eser adları `baslik` (TR) ve `baslik_en` (EN) alanlarında
- Yeni sayfa eklerken her iki dilde de eklenmeli, `SAYFA_ESLESME` güncellenmeli

### Bileşenler

- `Layout.astro` — sayfa iskeleti; title/description/og/twitter/canonical/hreflang.
  `og:image` **mutlak URL** olmalı (göreli verilirse sosyal ağlar görsel göstermez).
- `Nav.astro` — kaydırmaya duyarlı menü, TR/EN geçişi
- `Footer.astro`, `EserKart.astro` — ikisi de dil duyarlı
- `EserSema.astro` — JSON-LD (VisualArtwork + Offer + BreadcrumbList).
  Fiyat yalnızca gerçek sayıysa `Offer`'a yazılır; galeri notu gibi metinler yazılmaz.

### Yapı kararları

- **Büyüteç** yalnızca `(hover: hover) and (pointer: fine)` olan cihazlarda
  çalışır. Ekran genişliğine göre değil — dokunmatik tablet ile dar penceredeki
  fareli kullanıcı ayırt edilebilsin diye.
- **Ana sayfada seçili eserler**: rastgele 6, en fazla 1 satılmış.
- **İlgili eserler**: satıştakiler önce; kategori 3'e yetmezse diğerlerinden tamamlanır.
- **Filtre butonları** Tailwind sınıfı değiştirilerek değil, `data-active`
  özniteliğiyle yönetilir (`global.css` içinde stillenir) — hover çakışmasını önler.
- İstemci tarafı etkileşim düz `<script>` ve `data-*` öznitelikleriyle;
  JS çerçevesi yok.

## Yayın

GitHub Pages + Actions. `main` dalına push → otomatik yayın (2–3 dk).
Alan adı `ilknurgurcan.com`, DNS Cloudflare'de.

- `astro.config.mjs` içinde `site` **doğru olmalı**; sitemap ve mutlak URL'ler
  buna dayanır. `base` ayarı yok (site kök dizinde).
- Eser adı değişirse slug da değişir; eski adres için `redirects` bölümüne
  giriş eklenmeli.
- `public/googlec519ece89d05b7c4.html` **silinmemeli** — Search Console doğrulaması.
- `*.xlsx` dosyaları `.gitignore`'da; kaynak Excel depoya girmez.

## Belgeler

- `README.md` — projeye genel bakış
- `ICERIK-GUNCELLEME.md` — içerik güncelleme rehberi (kod bilmeyenler için)
- `ROADMAP.md` — yapılanlar ve bekleyenler
- `%OneDrive%/Documents/İlknur/WebSitesi/Yapılacaklar-WebSitesi.xlsx` —
  madde madde iş listesi ve gerekçeler
