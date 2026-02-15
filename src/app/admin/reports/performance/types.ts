export interface EmployeePerformance {
    id: string;
    name: string;
    role: 'Pekerja' | 'Driver' | 'Admin Outlet';
    avatar: string;
    jobsCompleted: number; // Total tasks/orders handled
    outlet: string; // Branch/outlet name
    onTimeRate: number; // Percentage
    attendance: number; // Percentage
}

export interface PerformanceFilterState {
    period: 'daily' | 'monthly' | 'yearly';
    date: Date;
    outletId: string;
}
