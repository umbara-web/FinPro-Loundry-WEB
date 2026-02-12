export interface SalesData {
    date: string; // YYYY-MM-DD or Month Year
    amount: number;
}

export interface ReportFilterState {
    period: 'daily' | 'monthly' | 'yearly';
    date: Date;
    outletId: string; // 'all' or specific ID
}

export interface SummaryStat {
    label: string;
    value: string;
    trend: string;
    isPositive: boolean;
}
