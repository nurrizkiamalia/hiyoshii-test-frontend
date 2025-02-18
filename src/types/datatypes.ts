export interface Packing {
  id: number;
  timestamp: string;
  pic: string;
  beratKotor: number;
  qtyPackA: number;
  qtyPackB: number;
  qtyPackC: number;
  rejectKg: number;
}

export interface PackingDTO {
  timestamp?: string;
  pic?: string;
  beratKotor?: number;
  qtyPackA?: number;
  qtyPackB?: number;
  qtyPackC?: number;
  rejectKg?: number;
}

export interface HourlyAccumulationDTO {
  timePeriod: string;
  identifier: string;
  totalQuantity: number;
}

export interface ProductivityDTO {
  timePeriod: string;
  pic: string;
  productivityPerHour: number;
  productivityPerDay: number;
}

export interface RejectRatioDTO {
  timePeriod: string;
  rejectionRatio: number;
}

export interface PackRatioDTO {
  timePeriod: string;
  packARatio: number;
  packBRatio: number;
  packCRatio: number;
}