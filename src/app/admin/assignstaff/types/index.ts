export interface Staff {
    id: number | string;
    name: string;
    role: string;
    status: 'Available' | 'Assigned';
    avatar: string;
    outletId: number | string | null; // null means available (not assigned)
}

export interface Outlet {
    id: number | string;
    name: string;
    location: string;
    description: string;
    color: string;
}
