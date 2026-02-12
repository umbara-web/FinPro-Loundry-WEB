import { useState, useMemo } from 'react';
import { EmployeePerformance } from './types';

const MOCK_EMPLOYEES: EmployeePerformance[] = [
    { id: '1', name: 'Budi Santoso', role: 'Driver', avatar: 'https://ui-avatars.com/api/?name=Budi', jobsCompleted: 145, rating: 4.8, onTimeRate: 98, attendance: 100 },
    { id: '2', name: 'Siti Aminah', role: 'Pekerja', avatar: 'https://ui-avatars.com/api/?name=Siti', jobsCompleted: 320, rating: 4.9, onTimeRate: 99, attendance: 95 },
    { id: '3', name: 'Rudi Hartono', role: 'Driver', avatar: 'https://ui-avatars.com/api/?name=Rudi', jobsCompleted: 112, rating: 4.5, onTimeRate: 92, attendance: 88 },
    { id: '4', name: 'Dewi Sartika', role: 'Pekerja', avatar: 'https://ui-avatars.com/api/?name=Dewi', jobsCompleted: 280, rating: 4.7, onTimeRate: 96, attendance: 92 },
    { id: '5', name: 'Ahmad Fauzi', role: 'Admin Outlet', avatar: 'https://ui-avatars.com/api/?name=Ahmad', jobsCompleted: 0, rating: 5.0, onTimeRate: 100, attendance: 100 }, // Admin might track other metrics
];

export const usePerformanceReport = (defaultOutletId: string = 'all') => {
    const [period, setPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedOutlet, setSelectedOutlet] = useState(defaultOutletId);

    // Mock logic: Filter employees based on outlet (simulated by random slice or logic)
    const performanceData = useMemo(() => {
        // In a real app, we would fetch data based on outletId and date params
        if (selectedOutlet === 'all') return MOCK_EMPLOYEES;
        // Simulate different data for specific outlet
        return MOCK_EMPLOYEES.slice(0, 3);
    }, [selectedOutlet, period, date]);

    const topPerformers = useMemo(() => {
        return [...performanceData].sort((a, b) => b.jobsCompleted - a.jobsCompleted).slice(0, 5);
    }, [performanceData]);

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
        performanceData,
        topPerformers,
        outlets
    };
};
