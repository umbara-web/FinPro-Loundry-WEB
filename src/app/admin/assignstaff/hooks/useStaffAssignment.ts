import { useState, useMemo, useEffect } from 'react';
import { Staff, Outlet } from '../types';
import api from '@/src/app/utils/api';
import { useAuth } from '@/src/context/AuthContext';

export const useStaffAssignment = () => {
    const { user } = useAuth();
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [allStaff, setAllStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedOutletId, setSelectedOutletId] = useState<number | string | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'admin' | 'staff' | 'driver'>('all');

    // Search states
    const [outletSearch, setOutletSearch] = useState('');
    const [staffSearch, setStaffSearch] = useState('');

    // Helper to map backend role to frontend
    const mapBackendRoleToFrontend = (role: string): string => {
        const map: Record<string, string> = {
            'WORKER': 'Staff Laundry',
            'ADMIN_OUTLET': 'Admin Outlet',
            'OUTLET_ADMIN': 'Admin Outlet',
            'DRIVER': 'Driver',
        };
        return map[role] || 'Staff Laundry';
    };

    // Fetch data from API
    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch outlets based on role
            let outletsData: any[] = [];
            if (user?.role === 'OUTLET_ADMIN' && user?.outlet_id) {
                const res = await api.get(`/api/outlets/${user.outlet_id}`);
                outletsData = Array.isArray(res.data) ? res.data : [res.data];
            } else if (user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN') {
                const res = await api.get('/api/outlets');
                outletsData = res.data.data || res.data;
            }

            console.log('Outlets data:', outletsData);

            // Map outlets to expected format - use string id to avoid NaN issues
            const mappedOutlets: Outlet[] = outletsData.filter((o: any) => o.id).map((o: any) => ({
                id: String(o.id),
                name: o.name,
                location: o.city || o.address || '',
                description: o.manager || '',
                color: o.status === 'ACTIVE' ? 'bg-green-500' : o.status === 'CLOSED' ? 'bg-red-500' : 'bg-orange-500'
            }));

            setOutlets(mappedOutlets);

            // Fetch workers
            const workersRes = await api.get('/api/workers');
            const workersData = workersRes.data.data || workersRes.data;

            console.log('Workers data:', workersData);

            // Map workers to Staff format
            const mappedStaff: Staff[] = Array.isArray(workersData) ? workersData.filter((w: any) => w.id).map((w: any) => ({
                id: String(w.id),
                name: w.staff?.name || w.name || '-',
                role: mapBackendRoleToFrontend(w.staff_type || w.role),
                status: w.outlet ? 'Assigned' : 'Available',
                avatar: w.staff?.profile_picture_url || `https://i.pravatar.cc/150?u=${w.id}`,
                outletId: w.outlet?.id ? String(w.outlet.id) : null
            })) : [];

            setAllStaff(mappedStaff);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    // 2. Available Staff (Middle Column)

    const availableStaff = useMemo(() => {
        return allStaff.filter(s => {
            const isUnassigned = s.outletId === null || s.outletId === undefined;
            const matchesSearch = s.name.toLowerCase().includes(staffSearch.toLowerCase());
            const matchesRole = activeTab === 'all' ||
                (activeTab === 'admin' && s.role === 'Admin Outlet') ||
                (activeTab === 'staff' && s.role === 'Staff Laundry') ||
                (activeTab === 'driver' && s.role === 'Driver');

            return isUnassigned && matchesSearch && matchesRole;
        });
    }, [allStaff, staffSearch, activeTab]);

    // 3. Assigned Staff (Right Column)

    const assignedStaff = useMemo(() => {
        if (!selectedOutlet) return [];
        return allStaff.filter(s => s.outletId === selectedOutlet.id);
    }, [allStaff, selectedOutlet]);




    const selectOutlet = (id: number | string) => {
        setSelectedOutletId(id);
    };

    const assignStaff = (staffId: number | string) => {
        if (!selectedOutlet) return;
        // Update local state only (API call would require backend support)
        setAllStaff(prev => prev.map(s =>
            s.id === staffId ? { ...s, outletId: selectedOutlet.id, status: 'Assigned' } : s
        ));
    };

    const unassignStaff = (staffId: number | string) => {
        // Update local state only (API call would require backend support)
        setAllStaff(prev => prev.map(s =>
            s.id === staffId ? { ...s, outletId: null, status: 'Available' } : s
        ));
    };

    return {
        loading,
        selectedOutlet,
        selectOutlet,
        outletSearch,
        setOutletSearch,
        filteredOutlets,

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
