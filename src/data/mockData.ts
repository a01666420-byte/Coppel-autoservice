import { CatalogPhone, CustomerProfile, DemoScenario, DiagnosedPhone, ValuationDetails } from '../types/kiosk';

export const MOCK_CUSTOMER: CustomerProfile = {
  customerNumber: '84920193',
  name: 'Roberto Morales Gómez',
  creditLimit: 25000,
  availableCredit: 16850,
  tier: 'Oro',
  punctualityScore: 'Excelente (Nivel 5)',
  phone: '667-284-9102',
};

export const BASE_TRADE_IN_MODELS = [
  { brand: 'Samsung', model: 'Galaxy S21 5G', storage: '128 GB', color: 'Gris Fantasma', basePrice: 6500 },
  { brand: 'Apple', model: 'iPhone 13', storage: '128 GB', color: 'Azul Medianoche', basePrice: 8200 },
  { brand: 'Xiaomi', model: '12 Pro', storage: '256 GB', color: 'Gris Cósmico', basePrice: 5800 },
  { brand: 'Motorola', model: 'Edge 30 Ultra', storage: '256 GB', color: 'Negro Interstellar', basePrice: 5100 },
  { brand: 'Samsung', model: 'Galaxy A54 5G', storage: '128 GB', color: 'Lima', basePrice: 4200 },
];

export function generateDiagnosedPhone(scenario: DemoScenario): { phone: DiagnosedPhone; valuation: ValuationDetails } {
  const baseModel = BASE_TRADE_IN_MODELS[0]; // Samsung Galaxy S21 5G default
  const basePrice = baseModel.basePrice;

  if (scenario === 'excelente') {
    const internalFactor = 1.0;
    const externalFactor = 0.98;
    const finalFactor = internalFactor * externalFactor;
    const finalValue = Math.round((basePrice * finalFactor) / 50) * 50;

    const phone: DiagnosedPhone = {
      brand: baseModel.brand,
      model: baseModel.model,
      storage: baseModel.storage,
      color: baseModel.color,
      imei: '358921/04/829104/3',
      serialNumber: 'RF8T409XZMK',
      batteryHealth: 96,
      storageStatus: 'OK',
      touchScreenStatus: 'OK',
      camerasStatus: 'OK',
      speakersStatus: 'OK',
      connectivityStatus: 'OK',
      cloudLockStatus: 'DESBLOQUEADO',
      theftReportStatus: 'LIMPIO',
      zones: {
        screen: 'sin_danio',
        backCover: 'sin_danio',
        cameraLenses: 'sin_danio',
        frameEdges: 'sin_danio',
      },
    };

    const valuation: ValuationDetails = {
      baseValue: basePrice,
      internalFactor,
      externalFactor,
      finalValue,
      grade: 'A',
      gradeLabel: 'Grado A - Excelente Estado',
      breakdown: [
        { label: 'Salud de Batería (96%)', score: '100%', impact: 'Sin deducción' },
        { label: 'Diagnóstico de Componentes Internos', score: '7 / 7 OK', impact: '100% Funcional' },
        { label: 'Pantalla y Sensores Táctiles', score: 'Sin rayones', impact: 'Evaluación óptica 10/10' },
        { label: 'Carcasa y Marco Perimetral', score: 'Impecable', impact: 'Sin golpes ni abolladuras' },
        { label: 'Lentes de Cámaras', score: 'Cristal pulcro', impact: 'Sin astilladuras' },
      ],
    };

    return { phone, valuation };
  } else if (scenario === 'desgaste') {
    const internalFactor = 0.90;
    const externalFactor = 0.85;
    const finalFactor = internalFactor * externalFactor; // 0.765 -> Grado B
    const finalValue = Math.round((basePrice * finalFactor) / 50) * 50;

    const phone: DiagnosedPhone = {
      brand: baseModel.brand,
      model: baseModel.model,
      storage: baseModel.storage,
      color: baseModel.color,
      imei: '358921/04/829104/3',
      serialNumber: 'RF8T409XZMK',
      batteryHealth: 84,
      storageStatus: 'OK',
      touchScreenStatus: 'OK',
      camerasStatus: 'OK',
      speakersStatus: 'OK',
      connectivityStatus: 'OK',
      cloudLockStatus: 'DESBLOQUEADO',
      theftReportStatus: 'LIMPIO',
      zones: {
        screen: 'desgaste_leve',
        backCover: 'desgaste_leve',
        cameraLenses: 'sin_danio',
        frameEdges: 'desgaste_leve',
      },
    };

    const valuation: ValuationDetails = {
      baseValue: basePrice,
      internalFactor,
      externalFactor,
      finalValue,
      grade: 'B',
      gradeLabel: 'Grado B - Buen Estado (Desgaste Normal)',
      breakdown: [
        { label: 'Salud de Batería (84%)', score: '84% Capacidad', impact: '-10% por ciclo de carga' },
        { label: 'Diagnóstico de Componentes Internos', score: '7 / 7 OK', impact: '100% Funcional' },
        { label: 'Pantalla frontal', score: 'Micro-rayones leves', impact: '-8% cosmético superficial' },
        { label: 'Carcasa y bordes de marco', score: 'Desgaste de uso leve', impact: '-7% estético' },
        { label: 'Lentes de Cámara', score: 'Sin rayones', impact: 'Sin deducción' },
      ],
    };

    return { phone, valuation };
  } else {
    // Pantalla rota / daño visible
    const internalFactor = 0.82;
    const externalFactor = 0.58;
    const finalFactor = internalFactor * externalFactor; // 0.475 -> Grado D (<0.6)
    const finalValue = Math.round((basePrice * finalFactor) / 50) * 50;

    const phone: DiagnosedPhone = {
      brand: baseModel.brand,
      model: baseModel.model,
      storage: baseModel.storage,
      color: baseModel.color,
      imei: '358921/04/829104/3',
      serialNumber: 'RF8T409XZMK',
      batteryHealth: 78,
      storageStatus: 'OK',
      touchScreenStatus: 'DESCALIBRADO',
      camerasStatus: 'OK',
      speakersStatus: 'OK',
      connectivityStatus: 'OK',
      cloudLockStatus: 'DESBLOQUEADO',
      theftReportStatus: 'LIMPIO',
      zones: {
        screen: 'danio_visible',
        backCover: 'desgaste_leve',
        cameraLenses: 'sin_danio',
        frameEdges: 'danio_visible',
      },
    };

    const valuation: ValuationDetails = {
      baseValue: basePrice,
      internalFactor,
      externalFactor,
      finalValue,
      grade: 'D',
      gradeLabel: 'Grado D - Daño en Pantalla / Requiere Reparación',
      breakdown: [
        { label: 'Salud de Batería (78%)', score: '78% Degenerada', impact: '-18% requiere servicio' },
        { label: 'Diagnóstico de Componentes Internos', score: 'Táctil con fallas leves', impact: 'Deducción funcional' },
        { label: 'Pantalla frontal', score: 'Fisura en esquina superior', impact: '-35% cambio de módulo display' },
        { label: 'Marco de aluminio', score: 'Abolladura visible en borde', impact: '-7% daño estructural' },
        { label: 'Lentes de Cámara', score: 'Sin fisuras', impact: 'Sin deducción' },
      ],
    };

    return { phone, valuation };
  }
}

export const CATALOG_PHONES: CatalogPhone[] = [
  {
    id: 'samsung-s24',
    brand: 'Samsung',
    name: 'Samsung Galaxy S24 5G',
    tagline: 'Galaxy AI incorporada y pantalla Dynamic AMOLED 2X',
    specs: {
      screen: '6.2" FHD+ 120Hz',
      processor: 'Exynos 2400 Deca-Core',
      camera: '50 MP + 12 MP + 10 MP con Zoom Óptico 3x',
      battery: '4,000 mAh Carga Rápida 25W',
      storage: '256 GB / 8 GB RAM',
    },
    color: 'Gris Ónice',
    colorHex: '#3D3F43',
    price: 18999,
    coppelInstallments12: 890,
    coppelInstallments18: 635,
    coppelInstallments24: 510,
    imageAccent: 'from-amber-700 to-slate-900',
    badge: 'Más Vendido en Tiendas Coppel',
  },
  {
    id: 'iphone-15',
    brand: 'Apple',
    name: 'Apple iPhone 15',
    tagline: 'Dynamic Island, chip A16 Bionic y cámara de 48 MP',
    specs: {
      screen: '6.1" Super Retina XDR OLED',
      processor: 'A16 Bionic 6 núcleos',
      camera: '48 MP Principal + 12 MP Ultra Gran Angular',
      battery: 'Hasta 20 horas de video / USB-C',
      storage: '128 GB / 6 GB RAM',
    },
    color: 'Azul Pastel',
    colorHex: '#84A6B8',
    price: 17499,
    coppelInstallments12: 820,
    coppelInstallments18: 585,
    coppelInstallments24: 470,
    imageAccent: 'from-blue-600 to-indigo-950',
    badge: 'Favorito Coppel Renueva',
  },
  {
    id: 'xiaomi-redmi-note-13-pro',
    brand: 'Xiaomi',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G',
    tagline: 'Cámara de 200 MP con OIS y Carga HyperCharge de 120W',
    specs: {
      screen: '6.67" AMOLED Curvo 120Hz 1.5K',
      processor: 'MediaTek Dimensity 7200 Ultra',
      camera: '200 MP + 8 MP + 2 MP Macro',
      battery: '5,000 mAh Carga 120W (0-100% en 19 min)',
      storage: '256 GB / 12 GB RAM',
    },
    color: 'Negro Medianoche',
    colorHex: '#1C1D21',
    price: 8999,
    coppelInstallments12: 420,
    coppelInstallments18: 300,
    coppelInstallments24: 245,
    imageAccent: 'from-violet-700 to-purple-950',
    badge: 'Mejor Relación Calidad-Precio',
  },
  {
    id: 'motorola-edge-50-pro',
    brand: 'Motorola',
    name: 'Motorola Edge 50 Pro 5G',
    tagline: 'Diseño en cuero vegano, certificación Pantone y TurboPower 125W',
    specs: {
      screen: '6.7" pOLED 144Hz Super HD',
      processor: 'Snapdragon 7 Gen 3',
      camera: '50 MP + 13 MP + 10 MP Telefoto 3x',
      battery: '4,500 mAh Carga 125W + Inalámbrica 50W',
      storage: '256 GB / 12 GB RAM',
    },
    color: 'Lavanda Silk',
    colorHex: '#6F6A88',
    price: 11499,
    coppelInstallments12: 540,
    coppelInstallments18: 385,
    coppelInstallments24: 310,
    imageAccent: 'from-fuchsia-700 to-slate-900',
  },
  {
    id: 'samsung-galaxy-a55',
    brand: 'Samsung',
    name: 'Samsung Galaxy A55 5G',
    tagline: 'Marco de metal premium, resistencia al agua IP67 y 4 años de OS',
    specs: {
      screen: '6.6" Super AMOLED 120Hz Vision Booster',
      processor: 'Exynos 1480 con GPU AMD',
      camera: '50 MP OIS + 12 MP + 5 MP Macro',
      battery: '5,000 mAh Duración 2 días',
      storage: '128 GB / 8 GB RAM',
    },
    color: 'Azul Hielo',
    colorHex: '#D0E4F2',
    price: 7999,
    coppelInstallments12: 375,
    coppelInstallments18: 270,
    coppelInstallments24: 215,
    imageAccent: 'from-cyan-600 to-blue-900',
  },
  {
    id: 'honor-magic-6-lite',
    brand: 'Honor',
    name: 'Honor Magic6 Lite 5G',
    tagline: 'Pantalla ultra resistente anticaídas Matrix y batería de 5,800 mAh',
    specs: {
      screen: '6.78" AMOLED Curva 1.5K 120Hz',
      processor: 'Snapdragon 6 Gen 1 (4nm)',
      camera: '108 MP Principal Ultra Clara + 5 MP Gran Angular',
      battery: '5,800 mAh (Autonomía de 3 días)',
      storage: '256 GB / 8 GB (+8GB Turbo RAM)',
    },
    color: 'Naranja Solar',
    colorHex: '#E25822',
    price: 7499,
    coppelInstallments12: 350,
    coppelInstallments18: 250,
    coppelInstallments24: 200,
    imageAccent: 'from-orange-600 to-amber-900',
  },
  {
    id: 'google-pixel-8a',
    brand: 'Google',
    name: 'Google Pixel 8a 5G',
    tagline: 'Fotografía computacional de nivel insignia y procesador Google Tensor G3',
    specs: {
      screen: '6.1" Actua Display OLED 120Hz',
      processor: 'Google Tensor G3 + Coprocesador Titan M2',
      camera: '64 MP Dual Pixel + 13 MP Ultra Wide',
      battery: '4,492 mAh Más de 24 hrs de batería',
      storage: '128 GB / 8 GB RAM',
    },
    color: 'Porcelana',
    colorHex: '#F0EBE3',
    price: 10999,
    coppelInstallments12: 515,
    coppelInstallments18: 370,
    coppelInstallments24: 295,
    imageAccent: 'from-emerald-600 to-teal-900',
  },
  {
    id: 'iphone-14',
    brand: 'Apple',
    name: 'Apple iPhone 14',
    tagline: 'Rendimiento probado, pantalla OLED y modo Acción para video',
    specs: {
      screen: '6.1" Super Retina XDR OLED Ceramic Shield',
      processor: 'A15 Bionic con GPU de 5 núcleos',
      camera: 'Sistema avanzado de 12 MP con Photonic Engine',
      battery: 'Hasta 20 hrs de video / MagSafe',
      storage: '128 GB / 6 GB RAM',
    },
    color: 'Medianoche',
    colorHex: '#1F2228',
    price: 13999,
    coppelInstallments12: 655,
    coppelInstallments18: 470,
    coppelInstallments24: 375,
    imageAccent: 'from-slate-700 to-slate-950',
  },
];
