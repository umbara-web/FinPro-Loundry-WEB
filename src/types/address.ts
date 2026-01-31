export interface Address {
  id: string; // UUID from backend
  label: string;
  recipientName: string;
  recipientPhone: string;
  fullAddress: string;
  city: string; // Kota/Kabupaten
  postalCode: string;
  notes?: string;
  latitude: number | null;
  longitude: number | null;
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
  latitude: number | null;
  longitude: number | null;
  isPrimary?: boolean;
}
