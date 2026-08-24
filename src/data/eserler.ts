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

export const eserler: Eser[] = [
  { slug: 'resim1',  baslik: 'Resim1',  kategori: 'kafeler',  yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60,  fiyat: 40000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim1.jpeg' },
  { slug: 'resim2',  baslik: 'Resim2',  kategori: 'sokaklar', yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30,  fiyat: "Sava Sanat Galerisi'nde Satışta", durum: 'satilabilir', ana_fotograf: '/images/Resim2.jpeg',  secili: true },
  { slug: 'resim3',  baslik: 'Resim3',  kategori: 'figur',    yil: 2023, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim3.jpeg' },
  { slug: 'resim4',  baslik: 'Resim4',  kategori: 'kafeler',  yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim4.jpeg',  secili: true },
  { slug: 'resim5',  baslik: 'Resim5',  kategori: 'sokaklar', yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30,  fiyat: "Sava Sanat Galerisi'nde Satışta", durum: 'satilabilir', ana_fotograf: '/images/Resim5.jpeg',  hero: true },
  { slug: 'resim6',  baslik: 'Resim6',  kategori: 'figur',    yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30,  fiyat: "Sava Sanat Galerisi'nde Satışta", durum: 'satilabilir', ana_fotograf: '/images/Resim6.jpeg',  secili: true },
  { slug: 'resim7',  baslik: 'Resim7',  kategori: 'kafeler',  yil: 2025, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 30,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim7.jpeg' },
  { slug: 'resim8',  baslik: 'Resim8',  kategori: 'sokaklar', yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim8.jpeg',  secili: true },
  { slug: 'resim9',  baslik: 'Resim9',  kategori: 'figur',    yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim9.jpeg' },
  { slug: 'resim11', baslik: 'Resim11', kategori: 'sokaklar', yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim11.jpeg' },
  { slug: 'resim12', baslik: 'Resim12', kategori: 'diger',    yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim12.jpeg', secili: true },
  { slug: 'resim13', baslik: 'Resim13', kategori: 'kafeler',  yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70,  fiyat: 60000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim13.jpeg' },
  { slug: 'resim14', baslik: 'Resim14', kategori: 'figur',    yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80,  fiyat: 60000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim14.jpeg', secili: true },
  { slug: 'resim16', baslik: 'Resim16', kategori: 'kafeler',  yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim16.jpeg', secili: true },
  { slug: 'resim17', baslik: 'Resim17', kategori: 'kafeler',  yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim17.jpeg' },
  { slug: 'resim18', baslik: 'Resim18', kategori: 'kafeler',  yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70,  fiyat: 60000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim18.jpeg' },
  { slug: 'resim19', baslik: 'Resim19', kategori: 'sokaklar', yil: 2019, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 70,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim19.jpeg' },
  { slug: 'resim20', baslik: 'Resim20', kategori: 'kafeler',  yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 65,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim20.jpeg' },
  { slug: 'resim21', baslik: 'Resim21', kategori: 'sokaklar', yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 45, boy: 55,  fiyat: 40000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim21.jpeg' },
  { slug: 'resim23', baslik: 'Resim23', kategori: 'diger',    yil: 2018, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80,  fiyat: 60000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim23.jpeg' },
  { slug: 'resim25', baslik: 'Resim25', kategori: 'sokaklar', yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 50,  fiyat: "Sava Sanat Galerisi'nde Satışta", durum: 'satilabilir', ana_fotograf: '/images/Resim25.jpeg' },
  { slug: 'resim26', baslik: 'Resim26', kategori: 'sokaklar', yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim26.jpeg' },
  { slug: 'resim27', baslik: 'Resim27', kategori: 'sokaklar', yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim27.jpeg' },
  { slug: 'resim28', baslik: 'Resim28', kategori: 'sokaklar', yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim28.jpeg' },
  { slug: 'resim29', baslik: 'Resim29', kategori: 'sokaklar', yil: 2024, teknik: 'Yağlıboya, tuval üzerine', en: 25, boy: 25,  fiyat: "Sava Sanat Galerisi'nde Satışta", durum: 'satilabilir', ana_fotograf: '/images/Resim29.jpeg' },
  { slug: 'resim30', baslik: 'Resim30', kategori: 'kafeler',  yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 35, boy: 50,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim30.jpeg' },
  { slug: 'resim31', baslik: 'Resim31', kategori: 'kafeler',  yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim31.jpeg' },
  { slug: 'resim32', baslik: 'Resim32', kategori: 'sokaklar', yil: 2011, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 70,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim32.jpeg' },
  { slug: 'resim33', baslik: 'Resim33', kategori: 'kafeler',  yil: 2010, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50,  fiyat: 35000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim33.jpeg' },
  { slug: 'resim34', baslik: 'Resim34', kategori: 'sokaklar', yil: 2014, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim34.jpeg' },
  { slug: 'resim35', baslik: 'Resim35', kategori: 'sokaklar', yil: 2013, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 60,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim35.jpeg' },
  { slug: 'resim37', baslik: 'Resim37', kategori: 'sokaklar', yil: 2016, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 60,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim37.jpeg' },
  { slug: 'resim38', baslik: 'Resim38', kategori: 'sokaklar', yil: 2015, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 50,  fiyat: 35000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim38.jpeg' },
  { slug: 'resim39', baslik: 'Resim39', kategori: 'kafeler',  yil: 2017, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim39.jpeg' },
  { slug: 'resim40', baslik: 'Resim40', kategori: 'diger',    yil: 2023, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80,  fiyat: 0,                                durum: 'satildi',    ana_fotograf: '/images/Resim40.jpeg' },
  { slug: 'resim41', baslik: 'Resim41', kategori: 'sokaklar', yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 40,  fiyat: 20000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim41.jpeg' },
  { slug: 'resim42', baslik: 'Resim42', kategori: 'sokaklar', yil: 2012, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70,  fiyat: 50000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim42.jpeg' },
  { slug: 'resim43', baslik: 'Resim43', kategori: 'sokaklar', yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 30, boy: 40,  fiyat: 20000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim43.jpeg' },
  { slug: 'resim44', baslik: 'Resim44', kategori: 'sokaklar', yil: 2012, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60,  fiyat: 30000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim44.jpeg' },
  { slug: 'resim45', baslik: 'Resim45', kategori: 'sokaklar', yil: 2009, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60,  fiyat: 20000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim45.jpeg' },
  { slug: 'resim46', baslik: 'Resim46', kategori: 'diger',    yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 50, boy: 70,  fiyat: 60000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim46.jpeg' },
  { slug: 'resim47', baslik: 'Resim47', kategori: 'sokaklar', yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 40, boy: 60,  fiyat: 40000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim47.jpeg' },
  { slug: 'resim48', baslik: 'Resim48', kategori: 'sokaklar', yil: 2026, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 70,  fiyat: 60000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim48.jpeg' },
  { slug: 'resim49', baslik: 'Resim49', kategori: 'portre',   yil: 2020, teknik: 'Yağlıboya, tuval üzerine', en: 60, boy: 80,  fiyat: 80000,                            durum: 'satilabilir', ana_fotograf: '/images/Resim49.jpeg' },
];

export function formatFiyat(fiyat: number | string, durum: Durum): string {
  if (durum === 'satildi') return '—';
  if (typeof fiyat === 'string') return fiyat;
  if (fiyat === 0) return '—';
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(fiyat);
}
