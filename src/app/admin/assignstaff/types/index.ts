export interface Staff {
    id: string;
    name: string;
    role: 'Admin Outlet' | 'Staff Laundry' | 'Driver';
    status: 'Available' | 'Assigned';
    avatar: string;
    outletId: string | null;
}

export interface Outlet {
    id: string;
    name: string;
    location: string;
    description: string;
    color: string; // We might need to generate this or mapped from backend if available
}
