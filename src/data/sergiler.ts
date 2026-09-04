export interface Sergi {
  baslik: string;
  baslik_en: string;
  tur: string;
  tur_en: string;
  mekan?: string;
  mekan_en?: string;
  sehir?: string;
  tarih: string;      // "1 Aralık — 31 Aralık 2026"
  tarih_en: string;
  donem: string;      // "Aralık 2026"
  donem_en: string;
  yil: string;        // "2018" veya "2011–12"
  durum: 'yaklasan' | 'devam' | 'gecmis';  // tarihten hesaplanır
  not?: string;
  not_en?: string;
}

// ---------------------------------------------------------------------------
// BU DOSYA OTOMATİK ÜRETİLİR — elle düzenlemeyin.
// Kaynak: Sergiler.xlsx    Üretim: python scripts/sergiler-uret.py
// ---------------------------------------------------------------------------

// Durum, üretim anındaki tarihe göre hesaplanır. Site statik olduğu için
// tarih sınırı geçtiğinde yeniden üretilmesi gerekir; haftalık kontrol
// görevi bunu yakalayıp yayına alır.
export const devamEdenSergiler: Sergi[] = [
  { baslik: 'Yılbaşı Sergisi', baslik_en: 'New Year Exhibition', tur: 'Karma', tur_en: 'Group Exhibition', mekan: 'Sava Sanat Galerisi', mekan_en: 'Sava Art Gallery', sehir: 'Ankara', tarih: '11 Aralık — 31 Aralık 2026', tarih_en: '11 December — 31 December 2026', donem: 'Aralık 2026', donem_en: 'December 2026', yil: '2026', durum: 'devam' },
];

export const yaklasanSergiler: Sergi[] = [
  { baslik: 'İlknur Gürcan Kişisel Sergisi', baslik_en: 'İlknur Gürcan Solo Exhibition', tur: 'Kişisel', tur_en: 'Solo Exhibition', mekan: 'Sava Sanat Galerisi', mekan_en: 'Sava Art Gallery', sehir: 'Ankara', tarih: '9 Ocak — 24 Ocak 2027', tarih_en: '9 January — 24 January 2027', donem: 'Ocak 2027', donem_en: 'January 2027', yil: '2027', durum: 'yaklasan' },
];

export const gecmisSergiler: Sergi[] = [
  { baslik: '12. Art Ankara Çağdaş Sanatlar Fuarı', baslik_en: '12th Art Ankara Contemporary Art Fair', tur: 'Fuar', tur_en: 'Art Fair', mekan: 'ATO - Congresium Kongre ve Sergi Merkezi', mekan_en: 'ATO Congresium', sehir: 'Ankara', tarih: '2026', tarih_en: '2026', donem: '2026', donem_en: '2026', yil: '2026', durum: 'gecmis' },
  { baslik: '2. Uluslararası Bilkent Sanat Festivali', baslik_en: '2nd International Bilkent Art Festival', tur: 'Festival', tur_en: 'Festival', mekan: 'Bilkent', mekan_en: 'Bilkent', sehir: 'Ankara', tarih: '2018', tarih_en: '2018', donem: '2018', donem_en: '2018', yil: '2018', durum: 'gecmis' },
  { baslik: "7. Knidos'un Sır'ı Sanat Çalıştayı", baslik_en: '7th "Secret of Knidos" Art Workshop', tur: 'Çalıştay', tur_en: 'Workshop', mekan: 'UKKSA', mekan_en: 'UKKSA', sehir: 'Datça', tarih: '2017', tarih_en: '2017', donem: '2017', donem_en: '2017', yil: '2017', durum: 'gecmis' },
  { baslik: '2. Art Ankara Çağdaş Sanatlar Fuarı', baslik_en: '2nd Art Ankara Contemporary Art Fair', tur: 'Fuar', tur_en: 'Art Fair', mekan: 'ATO - Congresium Kongre ve Sergi Merkezi', mekan_en: 'ATO Congresium', sehir: 'Ankara', tarih: '2016', tarih_en: '2016', donem: '2016', donem_en: '2016', yil: '2016', durum: 'gecmis' },
  { baslik: 'RC Sanat Galerisi — Bilkent Sanat Sokağı Açılış', baslik_en: 'RC Art Gallery — Bilkent Art Street Opening', tur: 'Kişisel', tur_en: 'Solo Exhibition', mekan: 'RC Sanat Galerisi', mekan_en: 'RC Art Gallery', sehir: 'Ankara', tarih: '2015', tarih_en: '2015', donem: '2015', donem_en: '2015', yil: '2015', durum: 'gecmis' },
  { baslik: 'Kişisel Sergi', baslik_en: 'Solo Exhibition', tur: 'Kişisel', tur_en: 'Solo Exhibition', mekan: 'Atilla Sav Sanat Galerisi', mekan_en: 'Atilla Sav Art Gallery', sehir: 'Ankara', tarih: '2013', tarih_en: '2013', donem: '2013', donem_en: '2013', yil: '2013', durum: 'gecmis' },
  { baslik: 'Kişisel Sergi', baslik_en: 'Solo Exhibition', tur: 'Kişisel', tur_en: 'Solo Exhibition', mekan: 'Ankara Tenis Kulübü', mekan_en: 'Ankara Tennis Club', sehir: 'Ankara', tarih: '2012', tarih_en: '2012', donem: '2012', donem_en: '2012', yil: '2012', durum: 'gecmis' },
  { baslik: 'Sardunya Resim Atölyesi Açılış Sergisi', baslik_en: 'Sardunya Painting Studio Opening Exhibition', tur: 'Kişisel', tur_en: 'Solo Exhibition', mekan: 'Sardunya Resim Atölyesi', mekan_en: 'Sardunya Painting Studio', sehir: 'Ankara', tarih: '2011', tarih_en: '2011', donem: '2011', donem_en: '2011', yil: '2011', durum: 'gecmis' },
  { baslik: 'Bilkent 1. Sanat Buluşması', baslik_en: 'Bilkent 1st Art Gathering', tur: 'Festival', tur_en: 'Festival', mekan: 'Bilkent', mekan_en: 'Bilkent', sehir: 'Ankara', tarih: '2010', tarih_en: '2010', donem: '2010', donem_en: '2010', yil: '2010', durum: 'gecmis' },
  { baslik: 'Kişisel Sergi', baslik_en: 'Solo Exhibition', tur: 'Kişisel', tur_en: 'Solo Exhibition', mekan: 'Bilkent Sanat Sokağı', mekan_en: 'Bilkent Art Street', sehir: 'Ankara', tarih: '2009', tarih_en: '2009', donem: '2009', donem_en: '2009', yil: '2009', durum: 'gecmis' },
];

/** Listeye alınmayan ('Gizle' işaretli) karma sergi sayısı. */
export const gizliSergiSayisi = 9;
