export type StepId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type DemoScenario = 'excelente' | 'desgaste' | 'pantalla_rota';

export type GradeLevel = 'A' | 'B' | 'C' | 'D';

export type DamageSeverity = 'sin_danio' | 'desgaste_leve' | 'danio_visible';

export interface CustomerProfile {
  customerNumber: string;
  name: string;
  creditLimit: number;
  availableCredit: number;
  tier: 'Oro' | 'Platino' | 'Tradicional';
  punctualityScore: string;
  phone: string;
}

export interface DiagnosedPhone {
  brand: string;
  model: string;
  storage: string;
  color: string;
  imei: string;
  serialNumber: string;
  batteryHealth: number; // e.g. 96%
  storageStatus: 'OK' | 'ADVERTENCIA';
  touchScreenStatus: 'OK' | 'DESCALIBRADO' | 'FALLA';
  camerasStatus: 'OK' | 'FALLA';
  speakersStatus: 'OK' | 'FALLA';
  connectivityStatus: 'OK' | 'FALLA';
  cloudLockStatus: 'DESBLOQUEADO' | 'BLOQUEADO';
  theftReportStatus: 'LIMPIO' | 'REPORTADO';
  zones: {
    screen: DamageSeverity;
    backCover: DamageSeverity;
    cameraLenses: DamageSeverity;
    frameEdges: DamageSeverity;
  };
}

export interface ValuationDetails {
  baseValue: number;
  internalFactor: number; // 0.6 to 1.0
  externalFactor: number; // 0.5 to 1.0
  finalValue: number;
  grade: GradeLevel;
  gradeLabel: string;
  breakdown: {
    label: string;
    score: string;
    impact: string;
  }[];
}

export interface CatalogPhone {
  id: string;
  brand: 'Samsung' | 'Apple' | 'Xiaomi' | 'Motorola' | 'Honor' | 'Google';
  name: string;
  tagline: string;
  specs: {
    screen: string;
    processor: string;
    camera: string;
    battery: string;
    storage: string;
  };
  color: string;
  colorHex: string;
  price: number;
  coppelInstallments12: number;
  coppelInstallments18: number;
  coppelInstallments24: number;
  imageAccent: string;
  badge?: string;
}

export type PaymentMethodType = 'terminal_tarjeta' | 'credito_coppel';

export interface PaymentSelection {
  method: PaymentMethodType;
  totalNewPhonePrice: number;
  tradeInDiscount: number;
  amountToPay: number;
  creditTermMonths?: 12 | 18 | 24;
  quincenalPayment?: number;
  cardBrand?: 'Visa' | 'Mastercard' | 'Coppel Pay';
  cardLastDigits?: string;
  paidAt?: Date;
}

export interface TransactionReceipt {
  ticketNumber: string;
  collectionCode: string; // 6-digit e.g. 849201
  assignedLocker: string; // e.g. "Locker #04 - Módulo A"
  lockerNumber: number; // 4
  purchaseDate: string;
  purchaseTime: string;
  countdownSeconds: number; // 30 mins (1800s)
  isReadyForPickup: boolean;
  storeName: string;
  kioskId: string;
}
