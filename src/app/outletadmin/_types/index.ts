export interface Order {
    id: string;
    date: string;
    customer: string;
    phone: string;
    service: string;
    items: string;
    quantity: number;
    weight: number;
    status: 'WAITING_DRIVER' | 'DRIVER_ASSIGNED' | 'PICKED_UP' | 'ARRIVED_OUTLET' | 'CANCELLED';
    assigned: string | null;
    total: string;
    paid: boolean;
}

export interface Stat {
    title: string;
    value: string;
    trend?: string;
    subtitle?: string;
    icon: 'calendar' | 'clock' | 'refresh' | 'check';
    iconColor: string;
}

export interface Employee {
    id: string;
    name: string;
    role: string;
}
