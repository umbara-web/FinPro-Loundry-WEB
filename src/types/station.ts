'use client';

// Station Types
export type StationType = 'WASHING' | 'IRONING' | 'PACKING';

export interface StationTask {
  id: string;
  orderId: string;
  invoiceNumber: string;
  customerName: string;
  customerAvatar?: string;
  weight: number;
  serviceType: string;
  status: 'IN_PROGRESS' | 'WAITING' | 'NEED_BYPASS';
  estimatedTime: string;
  items: Array<{ id: string; name: string; qty: number }>;
}

export interface LaundryItemType {
  id: string;
  name: string;
  subtitle: string;
  icon: string; // Lucide icon name
}

// Icon and subtitle config based on item name (case-insensitive match)
const LAUNDRY_ITEM_CONFIG: Record<string, { icon: string; subtitle: string }> = {
  'kemeja': { icon: 'Shirt', subtitle: 'Shirts / Formal' },
  'celana panjang': { icon: 'Briefcase', subtitle: 'Pants / Trousers' },
  'kaos': { icon: 'Shirt', subtitle: 'T-Shirts / Tops' },
  'jaket': { icon: 'Shirt', subtitle: 'Jackets / Hoodies' },
  'jas': { icon: 'Briefcase', subtitle: 'Suits / Blazers' },
  'rok': { icon: 'Package', subtitle: 'Skirts' },
  'dress': { icon: 'Package', subtitle: 'Dresses' },
  'selimut': { icon: 'Package', subtitle: 'Blankets' },
  'sprei': { icon: 'Package', subtitle: 'Bed Sheets' },
  'handuk': { icon: 'Package', subtitle: 'Towels' },
};

const DEFAULT_CONFIG = { icon: 'Package', subtitle: 'Other Items' };

// Helper to get icon/subtitle config by item name
export function getLaundryItemConfig(name: string): { icon: string; subtitle: string } {
  const key = name.toLowerCase();
  return LAUNDRY_ITEM_CONFIG[key] || DEFAULT_CONFIG;
}

export interface ItemCountData {
  [itemId: string]: number;
}

export interface StationConfig {
  name: string;
  nameBahasa: string;
  icon: string;
  color: string;
}

export const STATION_CONFIG: Record<StationType, StationConfig> = {
  WASHING: {
    name: 'Washing Station',
    nameBahasa: 'Cuci',
    icon: 'Waves',
    color: '#0a7ff5',
  },
  IRONING: {
    name: 'Ironing Station',
    nameBahasa: 'Setrika',
    icon: 'Flame',
    color: '#f97316',
  },
  PACKING: {
    name: 'Packing Station',
    nameBahasa: 'Packing',
    icon: 'Package',
    color: '#22c55e',
  },
};

// Helper function to get station config
export function getStationConfig(stationType: StationType): StationConfig {
  return STATION_CONFIG[stationType] || STATION_CONFIG.WASHING;
}
