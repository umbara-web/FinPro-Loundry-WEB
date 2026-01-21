export interface Address {
  id: string; // UUID from backend
  label: string;
  recipientName: string;
  recipientPhone: string;
  fullAddress: string;
  city: string; // District/Kecamatan
  postalCode: string;
  notes?: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  userId: number;
}

export interface AddressInput {
  label: string;
  recipientName: string;
  recipientPhone: string;
  fullAddress: string;
  city: string;
  postalCode: string;
  notes?: string;
  latitude: number;
  longitude: number;
  isPrimary?: boolean;
}
