export interface PickupRequest {
  id: string;
  customerId: string;
  addressId: string;
  assignedOutletId: string;
  schedulledPickupAt: string;
  notes?: string;
  status:
    | 'WAITING_DRIVER'
    | 'DRIVER_ASSIGNED'
    | 'PICKED_UP'
    | 'ARRIVED_OUTLET'
    | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePickupPayload {
  addressId: string;
  schedulledPickupAt: string;
  notes?: string;
  outletId?: string;
  items?: { laundryItemId: string; qty: number }[];
  manualItems?: { name: string; quantity: number }[];
}

export interface OutletInfo {
  id: string;
  name: string;
  address: string;
  serviceRadius: number;
}

export interface NearestOutletResult {
  outlet: OutletInfo | null;
  distance: number | null;
  isWithinRange: boolean;
}
