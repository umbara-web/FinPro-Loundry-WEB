export interface Outlet {
    id: string;
    name: string;
    address: string;
    city: string;
    manager: string;
    phone: string;
    openTime: string;
    status: 'ACTIVE' | 'CLOSED' | 'RENOVATION';
}

export interface OutletFormData {
    name: string;
    address: string;
    city: string;
    manager: string;
    phone: string;
    openTime: string;
    status: 'ACTIVE' | 'CLOSED' | 'RENOVATION';
}

export const OUTLET_STATUS_OPTIONS = [
    { value: 'ACTIVE', label: 'Aktif' },
    { value: 'CLOSED', label: 'Tutup' },
    { value: 'RENOVATION', label: 'Renovasi' }
];
