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
  status: 'IN_PROGRESS' | 'WAITING';
  estimatedTime: string;
}

export interface LaundryItemType {
  id: string;
  name: string;
  subtitle: string;
  icon: string; // Lucide icon name
}

export const LAUNDRY_ITEMS: LaundryItemType[] = [
  { id: 'kaos', name: 'Kaos', subtitle: 'T-Shirts / Tops', icon: 'Shirt' },
  { id: 'celana', name: 'Celana', subtitle: 'Pants / Jeans', icon: 'Briefcase' },
  { id: 'jaket', name: 'Jaket', subtitle: 'Jackets / Hoodies', icon: 'Jacket' },
  { id: 'dalaman', name: 'Dalaman', subtitle: 'Underwear / Socks', icon: 'Package' },
];

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
