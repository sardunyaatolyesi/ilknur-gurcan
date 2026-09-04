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
