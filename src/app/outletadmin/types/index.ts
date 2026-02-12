export interface Order {
    id: string;
    date: string;
    customer: string;
    phone: string;
    service: string;
    items: string;
    quantity: number;
    weight: number;
    status: 'In Progress' | 'Pending' | 'Ready' | 'Completed' | 'Cancelled';
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
