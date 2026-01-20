// Türkiye Bordro Parametreleri (2021-2026)
// H1: Ocak-Haziran, H2: Temmuz-Aralık

export const BORDRO_PARAMS = {
  2026: {
    // 2026 için şimdilik tek parametre (H2 değerleri henüz belli değil)
    H1: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 247725.0,
      sgkTaban: 33030.0,
      asgariUcretNet: 28075.5,
    },
    H2: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 247725.0,
      sgkTaban: 33030.0,
      asgariUcretNet: 28075.5,
    },
    gelirVergisiDilimleri: [
      { limit: 190000, oran: 0.15 },
      { limit: 400000, oran: 0.2 },
      { limit: 1440000, oran: 0.27 },
      { limit: 5160000, oran: 0.35 },
      { limit: Infinity, oran: 0.4 },
    ],
  },
  2025: {
    H1: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 150018.9, // 2024 H2 değeri devam
      sgkTaban: 20002.5,
      asgariUcretNet: 17002.12,
    },
    H2: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 195041.4,
      sgkTaban: 26005.5,
      asgariUcretNet: 22104.68,
    },
    gelirVergisiDilimleri: [
      { limit: 158000, oran: 0.15 },
      { limit: 330000, oran: 0.2 },
      { limit: 1200000, oran: 0.27 },
      { limit: 4300000, oran: 0.35 },
      { limit: Infinity, oran: 0.4 },
    ],
  },
  2024: {
    H1: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 100108.8, // 2023 H2 değeri devam
      sgkTaban: 17002.12,
      asgariUcretNet: 14462.0,
    },
    H2: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 150018.9,
      sgkTaban: 20002.5,
      asgariUcretNet: 17002.12,
    },
    gelirVergisiDilimleri: [
      { limit: 110000, oran: 0.15 },
      { limit: 230000, oran: 0.2 },
      { limit: 870000, oran: 0.27 },
      { limit: 3000000, oran: 0.35 },
      { limit: Infinity, oran: 0.4 },
    ],
  },
  2023: {
    H1: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 75348.6,
      sgkTaban: 10008.0,
      asgariUcretNet: 8506.8,
    },
    H2: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 100108.8,
      sgkTaban: 13414.5,
      asgariUcretNet: 11402.32,
    },
    gelirVergisiDilimleri: [
      { limit: 70000, oran: 0.15 },
      { limit: 150000, oran: 0.2 },
      { limit: 550000, oran: 0.27 },
      { limit: 1900000, oran: 0.35 },
      { limit: Infinity, oran: 0.4 },
    ],
  },
  2022: {
    H1: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 37837.5,
      sgkTaban: 5004.0,
      asgariUcretNet: 4253.4,
    },
    H2: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 75348.6,
      sgkTaban: 6471.0,
      asgariUcretNet: 5500.35,
    },
    gelirVergisiDilimleri: [
      { limit: 32000, oran: 0.15 },
      { limit: 70000, oran: 0.2 },
      { limit: 250000, oran: 0.27 },
      { limit: 880000, oran: 0.35 },
      { limit: Infinity, oran: 0.4 },
    ],
  },
  2021: {
    H1: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 26831.4,
      sgkTaban: 3577.5,
      asgariUcretNet: 2825.9,
    },
    H2: {
      sgkIsciPayi: 0.14,
      issizlikIsciPayi: 0.01,
      damgaVergisi: 0.00759,
      sgkTavan: 35058.9,
      sgkTaban: 3577.5,
      asgariUcretNet: 2825.9,
    },
    gelirVergisiDilimleri: [
      { limit: 24000, oran: 0.15 },
      { limit: 53000, oran: 0.2 },
      { limit: 130000, oran: 0.27 },
      { limit: 650000, oran: 0.35 },
      { limit: Infinity, oran: 0.4 },
    ],
  },
};

// Mevcut yıllar listesi
export const AVAILABLE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

// Varsayılan yıl
export const DEFAULT_YEAR = 2026;

// Geriye uyumluluk için
export const BORDRO_2025 = BORDRO_PARAMS[2025];

// Ay isimleri
export const AYLAR = {
  tr: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

// Aya göre parametre getir (H1: 0-5, H2: 6-11)
function getParamsForMonth(yearParams, monthIndex) {
  const half = monthIndex < 6 ? 'H1' : 'H2';
  return {
    ...yearParams[half],
    gelirVergisiDilimleri: yearParams.gelirVergisiDilimleri,
  };
}

// Brüt maaşı kullanarak vergi hesapla
export function calculateGrossToNet(brutMaas, yearParams) {
  const aylikDetaylar = [];
  let kumulatifGelirVergisiMatrahi = 0;
  let kumulatifAsgariUcretGVM = 0;

  for (let ay = 0; ay < 12; ay++) {
    // Bu ay için doğru parametreleri al
    const params = getParamsForMonth(yearParams, ay);

    // SGK matrahı (tavan ve taban arasında)
    const sgkMatrahi = Math.min(Math.max(brutMaas, params.sgkTaban), params.sgkTavan);

    // SGK kesintisi
    const sgkKesintisi = sgkMatrahi * params.sgkIsciPayi;

    // İşsizlik kesintisi
    const issizlikKesintisi = sgkMatrahi * params.issizlikIsciPayi;

    // Gelir vergisi matrahı (bu ay için)
    const aylikGVM = brutMaas - sgkKesintisi - issizlikKesintisi;

    // Asgari ücret gelir vergisi matrahı (muafiyet için)
    const asgariUcretSGK = params.sgkTaban * params.sgkIsciPayi;
    const asgariUcretIssizlik = params.sgkTaban * params.issizlikIsciPayi;
    const asgariUcretGVM = params.sgkTaban - asgariUcretSGK - asgariUcretIssizlik;

    // Kümülatif matrahlar
    kumulatifGelirVergisiMatrahi += aylikGVM;
    kumulatifAsgariUcretGVM += asgariUcretGVM;

    // Gelir vergisi hesapla (kümülatif dilim hesabı)
    const gelirVergisiToplam = hesaplaGelirVergisi(kumulatifGelirVergisiMatrahi, params);
    const oncekiGelirVergisiToplam =
      ay === 0 ? 0 : hesaplaGelirVergisi(kumulatifGelirVergisiMatrahi - aylikGVM, params);
    let aylikGelirVergisi = gelirVergisiToplam - oncekiGelirVergisiToplam;

    // Asgari ücret muafiyeti
    const asgariUcretVergisi = hesaplaGelirVergisi(kumulatifAsgariUcretGVM, params);
    const oncekiAsgariUcretVergisi =
      ay === 0 ? 0 : hesaplaGelirVergisi(kumulatifAsgariUcretGVM - asgariUcretGVM, params);
    const aylikAsgariUcretVergisi = asgariUcretVergisi - oncekiAsgariUcretVergisi;
    aylikGelirVergisi = Math.max(0, aylikGelirVergisi - aylikAsgariUcretVergisi);

    // Damga vergisi
    let damgaVergisi = brutMaas * params.damgaVergisi;
    // Asgari ücret kadar kısım muaf
    const asgariUcretDamga = params.sgkTaban * params.damgaVergisi;
    damgaVergisi = Math.max(0, damgaVergisi - asgariUcretDamga);

    // Net maaş
    const netMaas = brutMaas - sgkKesintisi - issizlikKesintisi - aylikGelirVergisi - damgaVergisi;

    // Vergi dilimi değişimi kontrolü
    const oncekiDilim =
      ay === 0
        ? null
        : bulDilim(kumulatifGelirVergisiMatrahi - aylikGVM, params.gelirVergisiDilimleri);
    const mevcutDilim = bulDilim(kumulatifGelirVergisiMatrahi, params.gelirVergisiDilimleri);
    const dilimDegisti = oncekiDilim !== null && oncekiDilim !== mevcutDilim;

    aylikDetaylar.push({
      ay: ay + 1,
      brut: brutMaas,
      sgk: sgkKesintisi,
      issizlik: issizlikKesintisi,
      kumulatifMatrah: kumulatifGelirVergisiMatrahi,
      gelirVergisi: aylikGelirVergisi,
      damgaVergisi,
      net: netMaas,
      dilimDegisti,
      vergiDilimi: mevcutDilim,
    });
  }

  return aylikDetaylar;
}

// Net maaşı kullanarak brüt hesapla (binary search)
export function calculateNetToGross(hedefNet, yearParams) {
  let minBrut = hedefNet;
  let maxBrut = hedefNet * 3;
  let sonuc = null;

  // Binary search ile brüt maaş bul (yıllık ortalama net'e göre)
  for (let i = 0; i < 50; i++) {
    const tahminiBrut = (minBrut + maxBrut) / 2;
    const aylikDetaylar = calculateGrossToNet(tahminiBrut, yearParams);

    // Yıllık toplam net / 12 = ortalama aylık net
    const yillikNet = aylikDetaylar.reduce((sum, ay) => sum + ay.net, 0);
    const ortalamaNet = yillikNet / 12;

    if (Math.abs(ortalamaNet - hedefNet) < 1) {
      sonuc = aylikDetaylar;
      break;
    }

    if (ortalamaNet < hedefNet) {
      minBrut = tahminiBrut;
    } else {
      maxBrut = tahminiBrut;
    }
  }

  return sonuc;
}

// Yardımcı fonksiyon: Kümülatif gelir vergisi hesapla
function hesaplaGelirVergisi(kumulatifMatrah, params) {
  let vergi = 0;
  let kalanMatrah = kumulatifMatrah;
  let oncekiLimit = 0;

  for (const dilim of params.gelirVergisiDilimleri) {
    const dilimAraligi = dilim.limit - oncekiLimit;
    const dilimMatrahi = Math.min(kalanMatrah, dilimAraligi);

    if (dilimMatrahi <= 0) break;

    vergi += dilimMatrahi * dilim.oran;
    kalanMatrah -= dilimMatrahi;
    oncekiLimit = dilim.limit;
  }

  return vergi;
}

// Yardımcı fonksiyon: Vergi dilimini bul
function bulDilim(kumulatifMatrah, dilimler) {
  for (let i = 0; i < dilimler.length; i++) {
    if (kumulatifMatrah <= dilimler[i].limit) {
      return i;
    }
  }
  return dilimler.length - 1;
}

// Yıllık toplamlar hesapla
export function calculateAnnualTotals(aylikDetaylar) {
  return aylikDetaylar.reduce(
    (toplam, ay) => ({
      brut: toplam.brut + ay.brut,
      sgk: toplam.sgk + ay.sgk,
      issizlik: toplam.issizlik + ay.issizlik,
      gelirVergisi: toplam.gelirVergisi + ay.gelirVergisi,
      damgaVergisi: toplam.damgaVergisi + ay.damgaVergisi,
      net: toplam.net + ay.net,
    }),
    { brut: 0, sgk: 0, issizlik: 0, gelirVergisi: 0, damgaVergisi: 0, net: 0 }
  );
}
