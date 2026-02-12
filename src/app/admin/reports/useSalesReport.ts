import { useState, useMemo } from 'react';
import { SalesData, SummaryStat } from './types';

// Mock Data Generation
const generateMockData = (period: 'daily' | 'monthly' | 'yearly', outletId: string): SalesData[] => {
    // Base multiplier based on outlet to simulate different data
    const multiplier = outletId === 'all' ? 5 : (parseInt(outletId) || 1);

    if (period === 'daily') {
        return Array.from({ length: 24 }, (_, i) => ({
            date: `${i}:00`,
            amount: Math.floor(Math.random() * 500000 * multiplier) + 100000
        }));
    } else if (period === 'monthly') {
        return Array.from({ length: 30 }, (_, i) => ({
            date: `Day ${i + 1}`,
            amount: Math.floor(Math.random() * 5000000 * multiplier) + 1000000
        }));
    } else {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map(m => ({
            date: m,
            amount: Math.floor(Math.random() * 100000000 * multiplier) + 20000000
        }));
    }
};

export const useSalesReport = (defaultOutletId: string = 'all') => {
    const [period, setPeriod] = useState<'daily' | 'monthly' | 'yearly'>('daily');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedOutlet, setSelectedOutlet] = useState(defaultOutletId);

    const chartData = useMemo(() => {
        return generateMockData(period, selectedOutlet);
    }, [period, date, selectedOutlet]);

    const stats: SummaryStat[] = useMemo(() => {
        const total = chartData.reduce((acc, curr) => acc + curr.amount, 0);
        const avg = total / chartData.length;

        return [
            {
                label: 'Total Income',
                value: `Rp ${total.toLocaleString('id-ID')}`,
                trend: '+12.5%',
                isPositive: true
            },
            {
                label: 'Average per ' + (period === 'daily' ? 'Hour' : period === 'monthly' ? 'Day' : 'Month'),
                value: `Rp ${Math.floor(avg).toLocaleString('id-ID')}`,
                trend: '-2.1%',
                isPositive: false
            },
            {
                label: 'Highest ' + (period === 'daily' ? 'Hour' : period === 'monthly' ? 'Day' : 'Month'),
                value: `Rp ${Math.max(...chartData.map(d => d.amount)).toLocaleString('id-ID')}`,
                trend: '+5.0%',
                isPositive: true
            }
        ];
    }, [chartData, period]);

    const outlets = [
        { id: '1', name: 'Outlet Pusat - Jakarta' },
        { id: '2', name: 'Cabang Bandung' },
        { id: '3', name: 'Cabang Surabaya' },
    ];

    return {
        period,
        setPeriod,
        date,
        setDate,
        selectedOutlet,
        setSelectedOutlet,
        chartData,
        stats,
        outlets
    };
};
