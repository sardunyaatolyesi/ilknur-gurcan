import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Bir görselin piksel boyutlarını okur (yalnızca derleme sırasında çalışır).
 *
 * Neden gerekli: WhatsApp, Facebook ve LinkedIn gibi uygulamalar bağlantı
 * önizlemesi üretirken og:image:width / og:image:height etiketlerini arar.
 * Bu etiketler yoksa önizleme çoğu zaman hiç gösterilmez.
 *
 * Dosya okunamazsa null döner; sayfa yine derlenir, yalnızca boyut etiketi
 * yazılmaz.
 */

type Boyut = { genislik: number; yukseklik: number };

const onbellek = new Map<string, Boyut | null>();

function jpegBoyut(veri: Buffer): Boyut | null {
  let i = 2; // SOI (FFD8) sonrası
  while (i < veri.length - 9) {
    if (veri[i] !== 0xff) { i++; continue; }
    const isaret = veri[i + 1];
    // SOF0..SOF3, SOF5..SOF7, SOF9..SOF11, SOF13..SOF15 → boyut buradadır
    const sofMu =
      (isaret >= 0xc0 && isaret <= 0xc3) ||
      (isaret >= 0xc5 && isaret <= 0xc7) ||
      (isaret >= 0xc9 && isaret <= 0xcb) ||
      (isaret >= 0xcd && isaret <= 0xcf);
    if (sofMu) {
      return {
        yukseklik: veri.readUInt16BE(i + 5),
        genislik:  veri.readUInt16BE(i + 7),
      };
    }
    if (isaret === 0xd8 || isaret === 0xd9 || (isaret >= 0xd0 && isaret <= 0xd7)) {
      i += 2;                                   // yük taşımayan işaretler
    } else {
      i += 2 + veri.readUInt16BE(i + 2);        // segmenti atla
    }
  }
  return null;
}

function pngBoyut(veri: Buffer): Boyut | null {
  if (veri.length < 24) return null;
  return { genislik: veri.readUInt32BE(16), yukseklik: veri.readUInt32BE(20) };
}

/**
 * Paylaşım için küçültülmüş kopya varsa onun yolunu döndürür.
 *
 * WhatsApp yaklaşık 300 KB üstündeki görseller için önizleme üretmiyor.
 * Sitede gösterilen tam çözünürlüklü dosyalara dokunmadan,
 * scripts/paylasim-gorseli-uret.py ile üretilen küçük kopyaları
 * yalnızca og:image etiketinde kullanıyoruz.
 */
export function paylasimGorseli(yol: string): string {
  const m = yol.match(/^\/images\/([^/]+)$/);
  if (!m) return yol;
  const aday = `/images/paylasim/${m[1]}`;
  try {
    readFileSync(join(process.cwd(), 'public', aday.replace(/^\//, '')));
    return aday;
  } catch {
    return yol;      // kopya üretilmemişse aslını kullan
  }
}

/** `yol` public/ klasörüne göre köke dayalı olmalı: "/images/Resim1.jpeg" */
export function gorselBoyut(yol: string): Boyut | null {
  if (onbellek.has(yol)) return onbellek.get(yol)!;

  let sonuc: Boyut | null = null;
  try {
    const veri = readFileSync(join(process.cwd(), 'public', yol.replace(/^\//, '')));
    sonuc = veri.subarray(0, 2).toString('hex') === 'ffd8'
      ? jpegBoyut(veri)
      : veri.subarray(1, 4).toString('ascii') === 'PNG'
        ? pngBoyut(veri)
        : null;
  } catch {
    sonuc = null;   // dosya yoksa sessizce geç
  }

  onbellek.set(yol, sonuc);
  return sonuc;
}
