export type Kategori = 'kafeler' | 'sokaklar' | 'figur' | 'portre' | 'diger';
export type Durum    = 'satilabilir' | 'satildi';

export interface Eser {
  slug: string;
  baslik: string;
  baslik_en: string;   // İngilizce sayfalarda kullanılır
  kategori: Kategori;
  yil: number;
  teknik: string;
  en: number;
  boy: number;
  fiyat: number | string; // sayı: TL fiyat | string: galeri notu | 0: satıldı (→ "—")
  durum: Durum;
  ana_fotograf: string;
  aciklama?: string;
  secili?: boolean;     // Ana sayfada seçili eserler bölümünde göster
  hero?: boolean;       // Hero görseli olarak kullan
  yayinlandi?: boolean; // false ise eserler sayfasında gösterme
}

// ---------------------------------------------------------------------------
// BU DOSYA OTOMATİK ÜRETİLİR — elle düzenlemeyin.
// Kaynak: Eserler.xlsx    Üretim: python scripts/eserler-uret.py
// ---------------------------------------------------------------------------
export const eserler: Eser[] = [
  { slug: 'aksam-servisi',            baslik: 'Akşam Servisi',             baslik_en: 'Evening Service',              kategori: 'kafeler',   yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60, fiyat: 40000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim1.jpeg'  , secili: true, hero: true },
  { slug: 'kirmizili-kadin',          baslik: 'Kırmızılı Kadın',           baslik_en: 'Woman in Red',                 kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 40, fiyat: 20000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim41.jpeg'  },
  { slug: 'kitabimla-kahvem',         baslik: 'Kitabımla Kahvem',          baslik_en: 'My Book and My Coffee',        kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 40, fiyat: 20000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim43.jpeg'  },
  { slug: 'iki-kedi-bir-yumak',       baslik: 'İki Kedi, Bir Yumak',       baslik_en: 'Two Cats, One Ball of Yarn',   kategori: 'diger',     yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim46.jpeg'  },
  { slug: 'balatta-yokus',            baslik: "Balat'ta Yokuş",            baslik_en: 'The Hill in Balat',            kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60, fiyat: 40000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim47.jpeg' , secili: true },
  { slug: 'pariste-gece',             baslik: "Paris'te Gece",             baslik_en: 'Night in Paris',               kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim48.jpeg' , secili: true, hero: true },
  { slug: 'hayal-sahafta-aksamustu',  baslik: "Hayal Sahaf'ta Akşamüstü",  baslik_en: 'Afternoon at Hayal Bookshop',  kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim8.jpeg'  , secili: true },
  { slug: 'kisa-hazirlik',            baslik: 'Kışa Hazırlık',             baslik_en: 'Ready for Winter',             kategori: 'sokaklar',  yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim2.jpeg'  , secili: true },
  { slug: 'kilit-cafe',               baslik: 'Kilit Cafe',                baslik_en: 'Kilit Café',                   kategori: 'sokaklar',  yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim5.jpeg'   },
  { slug: 'balat-antik',              baslik: 'Balat Antik',               baslik_en: 'Balat Antique',                kategori: 'figur',     yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim6.jpeg'  , secili: true },
  { slug: 'latife',                   baslik: 'Latife',                    baslik_en: 'Latife',                       kategori: 'figur',     yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim3.jpeg'  , secili: true, hero: true },
  { slug: 'kahve-molasi',             baslik: 'Kahve Molası',              baslik_en: 'Coffee Break',                 kategori: 'kafeler',   yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim4.jpeg'  , secili: true },
  { slug: 'masadaki-misafir',         baslik: 'Masadaki Misafir',          baslik_en: 'The Guest at the Table',       kategori: 'kafeler',   yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim7.jpeg'   },
  { slug: 'diyojen-sahaf',            baslik: 'Diyojen Sahaf',             baslik_en: 'Diyojen Bookshop',             kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 50, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim25.jpeg' , secili: true },
  { slug: 'kis-kahvesi',              baslik: 'Kış Kahvesi',               baslik_en: 'Winter Coffee',                kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim29.jpeg'  },
  { slug: 'kapi-onu-sohbeti',         baslik: 'Kapı Önü Sohbeti',          baslik_en: 'Doorstep Conversation',        kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim26.jpeg'  },
  { slug: 'sapkaci',                  baslik: 'Şapkacı',                   baslik_en: 'The Hatter',                   kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim27.jpeg'  },
  { slug: 'kitap-kokusu',             baslik: 'Kitap Kokusu',              baslik_en: 'The Scent of Books',           kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim28.jpeg'  },
  { slug: 'eren-manav',               baslik: 'Eren Manav',                baslik_en: 'Eren Greengrocer',             kategori: 'diger',     yil: 2023, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim40.jpeg' , secili: true },
  { slug: 'dogayi-dinlerken',         baslik: 'Doğayı Dinlerken',          baslik_en: 'Listening to Nature',          kategori: 'portre',    yil: 2020, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 80000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim49.jpeg'  },
  { slug: 'yesil-yol',                baslik: 'Yeşil Yol',                 baslik_en: 'The Green Path',               kategori: 'sokaklar',  yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim11.jpeg'  },
  { slug: 'maison-balat',             baslik: 'Maison Balat',              baslik_en: 'Maison Balat',                 kategori: 'kafeler',   yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim16.jpeg'  },
  { slug: 'agir-agir-ineceksin',      baslik: 'Ağır Ağır İneceksin',       baslik_en: 'Ascending and Descending',     kategori: 'sokaklar',  yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim19.jpeg'  },
  { slug: 'pitane',                   baslik: 'Pitane',                    baslik_en: 'Pitane',                       kategori: 'figur',     yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim14.jpeg'  },
  { slug: 'kafe-naftalin-2',          baslik: 'Kafe Naftalin - 2',         baslik_en: 'Café Naftalin II',             kategori: 'kafeler',   yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim18.jpeg' , secili: true },
  { slug: 'karakoy-corba-evi',        baslik: 'Karaköy Çorba Evi',         baslik_en: 'Karaköy Soup House',           kategori: 'diger',     yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim23.jpeg'  },
  { slug: 'ogle-molasi',              baslik: 'Öğle Molası',               baslik_en: 'Lunch Break',                  kategori: 'diger',     yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim12.jpeg'  },
  { slug: 'kafe-naftalin-1',          baslik: 'Kafe Naftalin - 1',         baslik_en: 'Café Naftalin I',              kategori: 'kafeler',   yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim17.jpeg'  },
  { slug: 'qrabiye',                  baslik: 'Qrabiye',                   baslik_en: 'Qrabiye',                      kategori: 'kafeler',   yil: 2017, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim39.jpeg'  },
  { slug: 'kemerli-pasaj',            baslik: 'Kemerli Pasaj',             baslik_en: 'The Arcade',                   kategori: 'kafeler',   yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim13.jpeg'  },
  { slug: 'montmartreda-akordeoncu',  baslik: "Montmartre'da Akordeoncu",  baslik_en: 'Accordionist in Montmartre',   kategori: 'kafeler',   yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 65, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim20.jpeg'  },
  { slug: 'iki-arkadas',              baslik: 'İki Arkadaş',               baslik_en: 'Two Friends',                  kategori: 'sokaklar',  yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 60, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim37.jpeg'  },
  { slug: 'paris-metrosu',            baslik: 'Paris Metrosu',             baslik_en: 'The Paris Métro',              kategori: 'sokaklar',  yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 45, boy: 55, fiyat: 40000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim21.jpeg'  },
  { slug: 'yesil-gurme',              baslik: 'Yeşil Gurme',               baslik_en: 'The Green Gourmet',            kategori: 'sokaklar',  yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 35000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim38.jpeg' , secili: true },
  { slug: 'la-taverne',               baslik: 'La Taverne',                baslik_en: 'La Taverne',                   kategori: 'kafeler',   yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 35, boy: 50, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim30.jpeg'  },
  { slug: 'la-cremaillere',           baslik: 'La Crémaillère',            baslik_en: 'La Crémaillère',               kategori: 'kafeler',   yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim31.jpeg'  },
  { slug: 'zeytin-evi',               baslik: 'Zeytin Evi',                baslik_en: 'The Olive House',              kategori: 'figur',     yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim9.jpeg'   },
  { slug: 'karli-teras',              baslik: 'Karlı Teras',               baslik_en: 'Snowy Terrace',                kategori: 'sokaklar',  yil: 2014, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim34.jpeg'  },
  { slug: 'karli-aksam',              baslik: 'Karlı Akşam',               baslik_en: 'Snowy Evening',                kategori: 'sokaklar',  yil: 2013, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 60, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim35.jpeg'  },
  { slug: 'cicek-lokantasi',          baslik: 'Çiçek Lokantası',           baslik_en: 'Çiçek Restaurant',             kategori: 'sokaklar',  yil: 2012, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 50000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim42.jpeg' , secili: true, hero: true },
  { slug: 'inci-pastanesi',           baslik: 'İnci Pastanesi',            baslik_en: 'İnci Patisserie',              kategori: 'sokaklar',  yil: 2012, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60, fiyat: 30000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim44.jpeg'  },
  { slug: 'okul-yolu',                baslik: 'Okul Yolu',                 baslik_en: 'The Way to School',            kategori: 'sokaklar',  yil: 2011, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim32.jpeg'  },
  { slug: 'hayallere-dalmak',         baslik: 'Hayallere Dalmak',          baslik_en: 'Lost in Daydreams',            kategori: 'kafeler',   yil: 2010, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 35000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim33.jpeg'  },
  { slug: 'kuytu-kafe',               baslik: 'Kuytu Kafe',                baslik_en: 'The Quiet Café',               kategori: 'sokaklar',  yil: 2009, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60, fiyat: 20000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim45.jpeg'  },
];

/** Galeri notu gibi serbest metin fiyatların İngilizce karşılığı. */
const FIYAT_NOTU_EN: Record<string, string> = {
  "Sava Sanat Galerisi'nde Satışta": 'Available at Sava Art Gallery',
};

export function formatFiyat(
  fiyat: number | string,
  durum: Durum,
  dil: 'tr' | 'en' = 'tr',
): string {
  if (durum === 'satildi') return '—';
  if (typeof fiyat === 'string') {
    return dil === 'en' ? (FIYAT_NOTU_EN[fiyat] ?? fiyat) : fiyat;
  }
  if (fiyat <= 0) {
    return dil === 'en' ? 'Price on request' : 'Fiyat için iletişime geçin';
  }
  return '₺' + fiyat.toLocaleString('tr-TR');
}
