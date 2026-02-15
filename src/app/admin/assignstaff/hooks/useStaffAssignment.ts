import { useState, useMemo, useEffect } from 'react';
import { Staff, Outlet } from '../types';
import api from '@/src/app/utils/api';

const OUTLET_COLORS = ['bg-purple-500', 'bg-blue-500', 'bg-orange-500', 'bg-emerald-500', 'bg-pink-500', 'bg-cyan-500', 'bg-yellow-500'];

// Map backend staff_type to frontend display role
const mapStaffType = (type: string): string => {
    const map: Record<string, string> = {
        'OUTLET_ADMIN': 'Admin Outlet',
        'WORKER': 'Staff Laundry',
        'DRIVER': 'Driver',
    };
    return map[type] || type;
};

export const useStaffAssignment = () => {
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [allStaff, setAllStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedOutletId, setSelectedOutletId] = useState<number | string | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'admin' | 'staff' | 'driver'>('all');

    // Search states
    const [outletSearch, setOutletSearch] = useState('');
    const [staffSearch, setStaffSearch] = useState('');

    // Fetch outlets and staff from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [outletsRes, workersRes] = await Promise.all([
                    api.get('/api/outlets'),
                    api.get('/api/workers'),
                ]);

                // Map outlets
                const outletsData = Array.isArray(outletsRes.data) ? outletsRes.data : (outletsRes.data.data || []);
                const mappedOutlets: Outlet[] = outletsData.map((o: any, index: number) => ({
                    id: o.id,
                    name: o.name || '-',
                    location: o.address || o.city || '-',
                    description: o.city || '',
                    color: OUTLET_COLORS[index % OUTLET_COLORS.length],
                }));
                setOutlets(mappedOutlets);

                // Map staff/workers
                const workersData = workersRes.data.data || workersRes.data;
                const mappedStaff: Staff[] = Array.isArray(workersData) ? workersData.map((w: any) => ({
                    id: w.id,
                    name: w.staff?.name || w.name || '-',
                    role: mapStaffType(w.staff_type || w.role || ''),
                    status: w.outlet_id ? 'Assigned' as const : 'Available' as const,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(w.staff?.name || w.name || 'U')}&background=1e293b&color=26E0C8&bold=true`,
                    outletId: w.outlet_id || null,
                })) : [];
                setAllStaff(mappedStaff);

            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- Refetch helper ---
    const refetchStaff = async () => {
        try {
            const res = await api.get('/api/workers');
            const workersData = res.data.data || res.data;
            const mappedStaff: Staff[] = Array.isArray(workersData) ? workersData.map((w: any) => ({
                id: w.id,
                name: w.staff?.name || w.name || '-',
                role: mapStaffType(w.staff_type || w.role || ''),
                status: w.outlet_id ? 'Assigned' as const : 'Available' as const,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(w.staff?.name || w.name || 'U')}&background=1e293b&color=26E0C8&bold=true`,
                outletId: w.outlet_id || null,
            })) : [];
            setAllStaff(mappedStaff);
        } catch (error) {
            console.error('Failed to refetch staff:', error);
        }
    };

    // --- SELECTION LOGIC ---
    const selectedOutlet = useMemo(() =>
        outlets.find(o => o.id === selectedOutletId) || null
        , [outlets, selectedOutletId]);

    // --- FILTERING LOGIC ---

    // 1. Filter Outlets
    const filteredOutlets = useMemo(() => {
        return outlets.filter(o =>
            o.name.toLowerCase().includes(outletSearch.toLowerCase()) ||
            o.location.toLowerCase().includes(outletSearch.toLowerCase())
        );
    }, [outlets, outletSearch]);

    // 2. Available Staff (not assigned to any outlet)
    const availableStaff = useMemo(() => {
        return allStaff.filter(s => {
            const isUnassigned = !s.outletId;
            const matchesSearch = s.name.toLowerCase().includes(staffSearch.toLowerCase());
            const matchesRole = activeTab === 'all' ||
                (activeTab === 'admin' && s.role === 'Admin Outlet') ||
                (activeTab === 'staff' && s.role === 'Staff Laundry') ||
                (activeTab === 'driver' && s.role === 'Driver');

            return isUnassigned && matchesSearch && matchesRole;
        });
    }, [allStaff, staffSearch, activeTab]);

    // 3. Assigned Staff (assigned to the selected outlet)
    const assignedStaff = useMemo(() => {
        if (!selectedOutlet) return [];
        return allStaff.filter(s => s.outletId === selectedOutlet.id);
    }, [allStaff, selectedOutlet]);

    const selectOutlet = (id: number | string) => {
        setSelectedOutletId(id);
    };

    const assignStaff = async (staffId: number | string) => {
        if (!selectedOutlet) return;
        try {
            // Update on backend
            await api.put(`/api/workers/${staffId}`, { outletId: selectedOutlet.id });
            // Update local state optimistically
            setAllStaff(prev => prev.map(s =>
                s.id === staffId ? { ...s, outletId: selectedOutlet.id, status: 'Assigned' as const } : s
            ));
        } catch (error) {
            console.error('Failed to assign staff:', error);
            alert('Gagal menugaskan staff');
        }
    };

    const unassignStaff = async (staffId: number | string) => {
        try {
            // We need to find a "default" or null outlet - for now just update local state
            // The backend might need a specific endpoint for unassignment
            setAllStaff(prev => prev.map(s =>
                s.id === staffId ? { ...s, outletId: null, status: 'Available' as const } : s
            ));
        } catch (error) {
            console.error('Failed to unassign staff:', error);
            alert('Gagal menghapus penugasan staff');
        }
    };

    return {
        selectedOutlet,
        selectOutlet,
        outletSearch,
        setOutletSearch,
        filteredOutlets,
        loading,

        activeTab,
        setActiveTab,
        staffSearch,
        setStaffSearch,
        availableStaff,

        assignedStaff,
        assignStaff,
        unassignStaff
    };
};

