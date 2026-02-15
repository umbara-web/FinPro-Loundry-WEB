import { useState, useEffect, useMemo } from 'react';
import { EmployeePerformance } from './types';
import api from '@/src/app/utils/api';

const MOCK_EMPLOYEES: EmployeePerformance[] = [
    { id: '1', name: 'Budi Santoso', role: 'Driver', avatar: 'https://ui-avatars.com/api/?name=Budi', jobsCompleted: 145, outlet: 'Outlet Pusat - Jakarta', onTimeRate: 98, attendance: 100 },
    { id: '2', name: 'Siti Aminah', role: 'Pekerja', avatar: 'https://ui-avatars.com/api/?name=Siti', jobsCompleted: 320, outlet: 'Cabang Bandung', onTimeRate: 99, attendance: 95 },
    { id: '3', name: 'Rudi Hartono', role: 'Driver', avatar: 'https://ui-avatars.com/api/?name=Rudi', jobsCompleted: 112, outlet: 'Cabang Surabaya', onTimeRate: 92, attendance: 88 },
    { id: '4', name: 'Dewi Sartika', role: 'Pekerja', avatar: 'https://ui-avatars.com/api/?name=Dewi', jobsCompleted: 280, outlet: 'Outlet Pusat - Jakarta', onTimeRate: 96, attendance: 92 },
    { id: '5', name: 'Ahmad Fauzi', role: 'Admin Outlet', avatar: 'https://ui-avatars.com/api/?name=Ahmad', jobsCompleted: 0, outlet: 'Cabang Bandung', onTimeRate: 100, attendance: 100 },
];

interface OutletFromAPI {
    id: string;
    name: string;
    [key: string]: any;
}

export const usePerformanceReport = (defaultOutletId: string = 'all') => {
    const [period, setPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedOutlet, setSelectedOutlet] = useState(defaultOutletId);
    const [outlets, setOutlets] = useState<{ id: string; name: string }[]>([]);

    // Fetch real outlets from the API
    useEffect(() => {
        const fetchOutlets = async () => {
            try {
                const res = await api.get('/api/outlets');
                const data: OutletFromAPI[] = Array.isArray(res.data) ? res.data : [];
                setOutlets(data.map((o) => ({ id: o.id, name: o.name })));
            } catch (error) {
                console.error('Failed to fetch outlets for performance filter:', error);
                setOutlets([]);
            }
        };
        fetchOutlets();
    }, []);

    // Filter employees by selected outlet name (Cabang column)
    const performanceData = useMemo(() => {
        if (selectedOutlet === 'all') return MOCK_EMPLOYEES;

        // Find the outlet name for the selected id
        const outletObj = outlets.find((o) => o.id === selectedOutlet);
        if (!outletObj) return MOCK_EMPLOYEES;

        return MOCK_EMPLOYEES.filter((emp) => emp.outlet === outletObj.name);
    }, [selectedOutlet, period, date, outlets]);

    const topPerformers = useMemo(() => {
        return [...performanceData].sort((a, b) => b.jobsCompleted - a.jobsCompleted).slice(0, 5);
    }, [performanceData]);

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
