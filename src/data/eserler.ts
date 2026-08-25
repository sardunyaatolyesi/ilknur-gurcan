export type Kategori = 'kafeler' | 'sokaklar' | 'figur' | 'portre' | 'diger';
export type Durum    = 'satilabilir' | 'satildi';

export interface Eser {
  slug: string;
  baslik: string;
  kategori: Kategori;
  yil: number;
  teknik: string;
  en: number;
  boy: number;
  fiyat: number | string; // sayı: TL fiyat | string: galeri notu | 0: satıldı (→ "—")
  durum: Durum;
  ana_fotograf: string;
  aciklama?: string;
  secili?: boolean;   // Ana sayfada seçili eserler bölümünde göster
  hero?: boolean;     // Hero görseli olarak kullan
  yayinlandi?: boolean; // false ise eserler sayfasında gösterme
}

// Bu dosya Eserler.xlsx'ten üretilmiştir. Elle düzenlemek yerine Excel'i güncelleyin.
export const eserler: Eser[] = [
  { slug: 'aksam-servisi',            baslik: 'Akşam Servisi',             kategori: 'kafeler',   yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60, fiyat: 40000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim1.jpeg'  , secili: true, hero: true },
  { slug: 'hayal-sahafta-aksamustu',  baslik: "Hayal Sahaf'ta Akşamüstü",  kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim8.jpeg'  , secili: true },
  { slug: 'kirmizili-kadin',          baslik: 'Kırmızılı Kadın',           kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 40, fiyat: 20000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim41.jpeg'  },
  { slug: 'kitabimla-kahvem',         baslik: 'Kitabımla Kahvem',          kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 40, fiyat: 20000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim43.jpeg'  },
  { slug: 'iki-kedi-bir-yumak',       baslik: 'İki Kedi, Bir Yumak',       kategori: 'diger',     yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim46.jpeg'  },
  { slug: 'balatta-yokus',            baslik: "Balat'ta Yokuş",            kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60, fiyat: 40000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim47.jpeg' , secili: true },
  { slug: 'pariste-gece',             baslik: "Paris'te Gece",             kategori: 'sokaklar',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim48.jpeg' , secili: true, hero: true },
  { slug: 'kisa-hazirlik',            baslik: 'Kışa Hazırlık',             kategori: 'sokaklar',  yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim2.jpeg'  , secili: true },
  { slug: 'kahve-molasi',             baslik: 'Kahve Molası',              kategori: 'kafeler',   yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim4.jpeg'  , secili: true },
  { slug: 'kilit-cafe',               baslik: 'Kilit Cafe',                kategori: 'sokaklar',  yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim5.jpeg'   },
  { slug: 'balat-antik',              baslik: 'Balat Antik',               kategori: 'figur',     yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim6.jpeg'  , secili: true },
  { slug: 'masadaki-misafir',         baslik: 'Masadaki Misafir',          kategori: 'kafeler',   yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim7.jpeg'   },
  { slug: 'latife',                   baslik: 'Latife',                    kategori: 'figur',     yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim3.jpeg'  , secili: true, hero: true },
  { slug: 'diyojen-sahaf',            baslik: 'Diyojen Sahaf',             kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 50, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim25.jpeg' , secili: true },
  { slug: 'kapi-onu-sohbeti',         baslik: 'Kapı Önü Sohbeti',          kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim26.jpeg'  },
  { slug: 'sapkaci',                  baslik: 'Şapkacı',                   kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim27.jpeg'  },
  { slug: 'kitap-kokusu',             baslik: 'Kitap Kokusu',              kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim28.jpeg'  },
  { slug: 'kis-kahvesi',              baslik: 'Kış Kahvesi',               kategori: 'sokaklar',  yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25, fiyat: "Sava Sanat Galerisi'nde Satışta",  durum: 'satilabilir',  ana_fotograf: '/images/Resim29.jpeg'  },
  { slug: 'eren-manav',               baslik: 'Eren Manav',                kategori: 'diger',     yil: 2023, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim40.jpeg' , secili: true },
  { slug: 'dogayi-dinlerken',         baslik: 'Doğayı Dinlerken',          kategori: 'portre',    yil: 2020, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 80000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim49.jpeg'  },
  { slug: 'yesil-yol',                baslik: 'Yeşil Yol',                 kategori: 'sokaklar',  yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim11.jpeg'  },
  { slug: 'maison-balat',             baslik: 'Maison Balat',              kategori: 'kafeler',   yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim16.jpeg'  },
  { slug: 'agir-agir-ineceksin',      baslik: 'Ağır Ağır İneceksin',       kategori: 'sokaklar',  yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim19.jpeg'  },
  { slug: 'ogle-molasi',              baslik: 'Öğle Molası',               kategori: 'diger',     yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim12.jpeg'  },
  { slug: 'pitane',                   baslik: 'Pitane',                    kategori: 'figur',     yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim14.jpeg'  },
  { slug: 'kafe-naftalin-1',          baslik: 'Kafe Naftalin - 1',         kategori: 'kafeler',   yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim17.jpeg'  },
  { slug: 'kafe-naftalin-2',          baslik: 'Kafe Naftalin - 2',         kategori: 'kafeler',   yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim18.jpeg' , secili: true },
  { slug: 'karakoy-corba-evi',        baslik: 'Karaköy Çorba Evi',         kategori: 'diger',     yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim23.jpeg'  },
  { slug: 'qurabiye',                 baslik: 'Qurabiye',                  kategori: 'kafeler',   yil: 2017, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim39.jpeg'  },
  { slug: 'kemerli-pasaj',            baslik: 'Kemerli Pasaj',             kategori: 'kafeler',   yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 60000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim13.jpeg'  },
  { slug: 'montmartreda-akerdeoncu',  baslik: "Montmartre'da Akerdeoncu",  kategori: 'kafeler',   yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 65, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim20.jpeg'  },
  { slug: 'iki-arkadas',              baslik: 'İki Arkadaş',               kategori: 'sokaklar',  yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 60, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim37.jpeg'  },
  { slug: 'zeytin-evi',               baslik: 'Zeytin Evi',                kategori: 'figur',     yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim9.jpeg'   },
  { slug: 'paris-metrosu',            baslik: 'Paris Metrosu',             kategori: 'sokaklar',  yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 45, boy: 55, fiyat: 40000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim21.jpeg'  },
  { slug: 'la-taverne',               baslik: 'La Taverne',                kategori: 'kafeler',   yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 35, boy: 50, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim30.jpeg'  },
  { slug: 'la-cr-maill-re',           baslik: 'La Crémaillère',            kategori: 'kafeler',   yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim31.jpeg'  },
  { slug: 'yesil-gurme',              baslik: 'Yeşil Gurme',               kategori: 'sokaklar',  yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 35000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim38.jpeg' , secili: true },
  { slug: 'karli-teras',              baslik: 'Karlı Teras',               kategori: 'sokaklar',  yil: 2014, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim34.jpeg'  },
  { slug: 'karli-aksam',              baslik: 'Karlı Akşam',               kategori: 'sokaklar',  yil: 2013, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 60, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim35.jpeg'  },
  { slug: 'cicek-lokantasi',          baslik: 'Çiçek Lokantası',           kategori: 'sokaklar',  yil: 2012, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70, fiyat: 50000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim42.jpeg'  },
  { slug: 'inci-pastanesi',           baslik: 'İnci Pastanesi',            kategori: 'sokaklar',  yil: 2012, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60, fiyat: 30000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim44.jpeg'  },
  { slug: 'okul-yolu',                baslik: 'Okul Yolu',                 kategori: 'sokaklar',  yil: 2011, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 70, fiyat: 0,                                  durum: 'satildi',      ana_fotograf: '/images/Resim32.jpeg'  },
  { slug: 'hayallere-dalmak',         baslik: 'Hayallere Dalmak',          kategori: 'kafeler',   yil: 2010, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50, fiyat: 35000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim33.jpeg'  },
  { slug: 'kuytu-kafe',               baslik: 'Kuytu Kafe',                kategori: 'sokaklar',  yil: 2009, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60, fiyat: 20000,                              durum: 'satilabilir',  ana_fotograf: '/images/Resim45.jpeg'  },
];

export function formatFiyat(fiyat: number | string, durum: Durum): string {
  if (durum === 'satildi') return '—';
  if (typeof fiyat === 'string') return fiyat;
  if (fiyat <= 0) return 'Fiyat için iletişime geçin';
  return '₺' + fiyat.toLocaleString('tr-TR');
}
