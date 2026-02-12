export interface Staff {
    id: number;
    name: string;
    role: string;
    status: 'Available' | 'Assigned';
    avatar: string;
    outletId: number | null; // null means available (not assigned)
}

export interface Outlet {
    id: number;
    name: string;
    location: string;
    description: string;
    color: string;
}
