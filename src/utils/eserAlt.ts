import type { Eser } from '../data/eserler';

/**
 * Eser görselinin alt metni.
 *
 * İki işe birden yarıyor:
 *
 * 1. Erişilebilirlik. Ekran okuyucu kullanan ziyaretçi önceden yalnızca eser
 *    adını duyuyordu; artık neye baktığını da öğreniyor.
 *
 * 2. Google Görseller. Ekim 2026 ölçümünde eserler görsel aramasında üç ayda
 *    454 gösterim alıyor, ortalama 34,8. sırada çıkıyor ve hiç tıklanmıyordu.
 *    Alt metni o tarihe kadar yalnızca eser adıydı — görsel aramasının en
 *    güçlü sinyali boş duruyordu.
 *
 * Bilerek TASVİR, yorum değil: gören ziyaretçiye tuval hakkında bir okuma
 * dayatmaz. (Eser başına özgün tasvir — "raflar, vitrinden süzülen ışık" gibi —
 * ayrı bir iş olarak Yapılacaklar listesinde.)
 */
export function eserAlt(eser: Eser, dil: 'tr' | 'en'): string {
  const olcu = `${eser.en}×${eser.boy} cm`;
  return dil === 'tr'
    ? `${eser.baslik} — İlknur Gürcan'ın yağlıboya tablosu, ${eser.yil}, ${olcu}`
    : `${eser.baslik_en} — oil painting on canvas by İlknur Gürcan, ${eser.yil}, ${olcu}`;
}
