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
