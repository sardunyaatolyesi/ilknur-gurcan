# İlknur Gürcan — Sanatçı Web Sitesi

Ressam İlknur Gürcan'ın (Sardunya Resim Atölyesi, Ankara) kişisel web sitesi.
Türkçe ve İngilizce, 44 eserlik bir portfolyo.

**Yayında:** [ilknurgurcan.com](https://ilknurgurcan.com) · [ilknurgurcan.com/en](https://ilknurgurcan.com/en/)

---

## Kısaca nasıl çalışıyor

Bu bir **statik site**. Yani veritabanı, sunucu tarafı kod veya aylık sunucu
ücreti yok. `npm run build` komutu her sayfayı önceden üretilmiş HTML dosyasına
çeviriyor; GitHub bunları ücretsiz olarak yayınlıyor.

```
Eserler.xlsx  →  eserler.ts  →  npm run build  →  dist/  →  GitHub  →  ilknurgurcan.com
   (içerik)      (site verisi)     (98 sayfa)              (otomatik)
```

`main` dalına yapılan her gönderim (push) siteyi otomatik yeniden yayınlar;
2–3 dakika sürer. Ayrı bir işlem gerekmez.

## Kullanılan teknolojiler

| Ne | Neden |
| :-- | :-- |
| [Astro](https://astro.build) 6 | Statik site üretimi; çıktısı saf HTML/CSS/JS |
| Tailwind CSS 4 | Stil (ayrı yapılandırma dosyası yok, `src/styles/global.css` içinde) |
| TypeScript | Tip denetimi (strict) |
| GitHub Pages + Actions | Ücretsiz barındırma ve otomatik yayın |
| Cloudflare | DNS ve alan adı yönlendirmesi |
| Web3Forms | İletişim formu (sunucu gerektirmeden e-posta) |

Node.js **22 veya üstü** gerekir (Astro 6 şartı).

## Komutlar

Tümü proje kökünden (`ilknur-gurcan/`) çalıştırılır:

| Komut | Ne yapar |
| :-- | :-- |
| `npm install` | Bağımlılıkları kurar (ilk kurulumda bir kez) |
| `npm run dev` | Yerel önizleme: `localhost:4321` |
| `npm run build` | Siteyi `dist/` klasörüne üretir |
| `npm run preview` | Üretilmiş siteyi yerelde açar |
| `npm run astro check` | TypeScript hatalarını denetler |
| `python scripts/eserler-uret.py` | Excel'den eser verisini üretir |

## Klasör yapısı

```
ilknur-gurcan/
├── public/              Doğrudan kopyalanan dosyalar
│   ├── images/            Eser fotoğrafları (Resim1.jpeg …)
│   ├── og-image.jpg       Sosyal medya paylaşım kapağı
│   ├── robots.txt
│   └── google…html        Search Console doğrulaması (SİLMEYİN)
├── scripts/
│   ├── eserler-uret.py    Excel → eserler.ts dönüştürücü
│   └── kaynak.py          Excel dosyalarının yerini bulur (OneDrive)
├── src/
│   ├── components/        Nav, Footer, EserKart, EserSema
│   ├── data/eserler.ts    Eser verisi (OTOMATİK ÜRETİLİR)
│   ├── i18n/ui.ts         Türkçe/İngilizce metin sözlüğü
│   ├── layouts/           Sayfa iskeleti, meta etiketleri
│   ├── pages/             Türkçe sayfalar
│   │   └── en/              İngilizce sayfalar
│   └── styles/global.css  Renk paleti, fontlar, buton stilleri
└── astro.config.mjs       Site adresi, sitemap, yönlendirmeler
```

## Belgeler

- **[ICERIK-GUNCELLEME.md](ICERIK-GUNCELLEME.md)** — Eser ekleme, fiyat değiştirme,
  sergi güncelleme. Kod bilmeden yapılabilecek işler.
- **[ROADMAP.md](ROADMAP.md)** — Yapılanlar ve bekleyen işler.
- **[CLAUDE.md](CLAUDE.md)** — Claude Code için teknik notlar.

## Dosyalar nerede

Kaynak dosyalar (Excel'ler, eserlerin yüksek çözünürlüklü asılları) **OneDrive'da**
tutulur: `Belgeler\İlknur\WebSitesi\`. Başka kopyaları olmadığı için orada; OneDrive
yedekliyor. Betikler Excel'i kendiliğinden bulur.

Kod ise yerel diskte kalır. Yedeği GitHub'da — sürüm geçmişiyle birlikte, yani
OneDrive'dan daha iyi korunuyor. OneDrive'a taşınmaz: `node_modules` ve `.git`
on binlerce dosya demek, senkronizasyon hem yavaşlar hem derleme sırasında dosya
kilidi çakışması üretir. İki klasörde de diğerine giden kısayol var.

Yapılacak işlerin güncel listesi `WebSitesi\Yapılacaklar-WebSitesi.xlsx` dosyasındadır.
