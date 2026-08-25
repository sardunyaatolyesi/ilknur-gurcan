export type Dil = 'tr' | 'en';

export const DILLER: Record<Dil, string> = {
  tr: 'Türkçe',
  en: 'English',
};

export const VARSAYILAN_DIL: Dil = 'tr';

/**
 * Bir yolun hangi dile ait olduğunu bulur.
 *   /eserler      -> tr
 *   /en/works     -> en
 */
export function dilBul(pathname: string): Dil {
  return pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'tr';
}

/** Sayfa karşılıkları: dil değiştiricinin aynı sayfada kalmasını sağlar. */
export const SAYFA_ESLESME: { tr: string; en: string }[] = [
  { tr: '/',          en: '/en/' },
  { tr: '/eserler',   en: '/en/works' },
  { tr: '/sergiler',  en: '/en/exhibitions' },
  { tr: '/hakkinda',  en: '/en/about' },
  { tr: '/iletisim',  en: '/en/contact' },
];

/** Mevcut yolun diğer dildeki karşılığını verir. */
export function digerDilYolu(pathname: string, hedef: Dil): string {
  const temiz = pathname.replace(/\/$/, '') || '/';

  // Eser detay sayfaları: slug iki dilde de aynı
  const eserTr = temiz.match(/^\/eserler\/(.+)$/);
  if (eserTr) return hedef === 'en' ? `/en/works/${eserTr[1]}` : temiz;

  const eserEn = temiz.match(/^\/en\/works\/(.+)$/);
  if (eserEn) return hedef === 'tr' ? `/eserler/${eserEn[1]}` : temiz;

  const eslesme = SAYFA_ESLESME.find(
    s => s.tr.replace(/\/$/, '') === temiz || s.en.replace(/\/$/, '') === temiz,
  );
  if (eslesme) return hedef === 'en' ? eslesme.en : eslesme.tr;

  return hedef === 'en' ? '/en/' : '/';
}

export const ui = {
  tr: {
    // Menü
    'nav.eserler':   'Eserler',
    'nav.sergiler':  'Sergiler',
    'nav.hakkinda':  'Hakkında',
    'nav.iletisim':  'İletişim',
    'nav.anasayfa':  'Ana Sayfa',

    // Kategoriler
    'kat.kafeler':   'Kafeler',
    'kat.sokaklar':  'Sokaklar',
    'kat.figur':     'Figür',
    'kat.portre':    'Portre',
    'kat.diger':     'Diğer',
    'kat.tumu':      'Tümü',

    // Durum
    'durum.satista':    'Satışta',
    'durum.satildi':    'Satıldı',
    'durum.satistakiler':   'Satışta Olanlar',
    'durum.satilanlar':     'Daha Önce Satılanlar',

    // Eser detay
    'eser.teknik':      'Teknik',
    'eser.boyut':       'Boyut',
    'eser.yil':         'Yıl',
    'eser.durum':       'Durum',
    'eser.fiyat':       'Fiyat',
    'eser.teknikDeger': 'Yağlıboya, tuval üzerine',
    'eser.yakinlastir': 'Üzerine gelerek yakınlaştırın',
    'eser.hakkinda':    'Eser Hakkında',
    'eser.ilgili':      'İlgili Eserler',
    'eser.sayac':       'eser',
    'eser.bulunamadi':  'Bu seçimde eser bulunamadı.',
    'eser.koleksiyon':  'Koleksiyon',
    'eser.kesfet':      'Keşfet',
  },

  en: {
    // Menü
    'nav.eserler':   'Works',
    'nav.sergiler':  'Exhibitions',
    'nav.hakkinda':  'About',
    'nav.iletisim':  'Contact',
    'nav.anasayfa':  'Home',

    // Kategoriler
    'kat.kafeler':   'Cafés',
    'kat.sokaklar':  'Streets',
    'kat.figur':     'Figures',
    'kat.portre':    'Portraits',
    'kat.diger':     'Other',
    'kat.tumu':      'All',

    // Durum
    'durum.satista':    'Available',
    'durum.satildi':    'Sold',
    'durum.satistakiler':   'Available',
    'durum.satilanlar':     'Previously Sold',

    // Eser detay
    'eser.teknik':      'Medium',
    'eser.boyut':       'Dimensions',
    'eser.yil':         'Year',
    'eser.durum':       'Status',
    'eser.fiyat':       'Price',
    'eser.teknikDeger': 'Oil on canvas',
    'eser.yakinlastir': 'Hover to zoom',
    'eser.hakkinda':    'About This Work',
    'eser.ilgili':      'Related Works',
    'eser.sayac':       'works',
    'eser.bulunamadi':  'No works match this selection.',
    'eser.koleksiyon':  'Collection',
    'eser.kesfet':      'Discover',
  },
} as const;

export function ceviri(dil: Dil) {
  return function t(anahtar: keyof (typeof ui)['tr']): string {
    return ui[dil][anahtar] ?? ui.tr[anahtar];
  };
}
