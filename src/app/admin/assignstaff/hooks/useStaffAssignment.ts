import { useState, useMemo, useEffect } from 'react';
import { Staff, Outlet } from '@/app/admin/assignstaff/types';
import api from '@/utils/api';

export const useStaffAssignment = () => {
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [allStaff, setAllStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'admin' | 'staff' | 'driver'>('all');

    // Search states
    const [outletSearch, setOutletSearch] = useState('');
    const [staffSearch, setStaffSearch] = useState('');

    // Fetch Data
    const fetchData = async () => {
        try {
            setLoading(true);
            const [outletsRes, workersRes] = await Promise.all([
                api.get('/api/outlets'),
                api.get('/api/workers?limit=100') // Fetch all workers for now
            ]);

            // Map Outlets
            const mappedOutlets = outletsRes.data.map((o: any) => ({
                id: o.id,
                name: o.name,
                location: o.address || o.location || 'No Location',
                description: o.description || 'No Description',
                color: 'bg-blue-500' // Default color for now
            }));
            setOutlets(mappedOutlets);

            // Map Workers
            const workersData = workersRes.data.data || [];
            const mappedStaff = workersData.map((w: any) => ({
                id: w.id, // Use staff table ID (w.id) to match backend endpoints
                name: w.staff?.name || 'Unknown',
                role: w.staff_type === 'WORKER' ? 'Staff Laundry' :
                    w.staff_type === 'DRIVER' ? 'Driver' :
                        w.staff_type === 'ADMIN' ? 'Admin Outlet' : w.staff_type,
                status: w.outlet_id ? 'Assigned' : 'Available',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(w.staff?.name || 'User')}&background=random`,
                outletId: w.outlet_id || null
            }));
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
            const isUnassigned = s.outletId === null;
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


    const selectOutlet = (id: string) => {
        setSelectedOutletId(id);
    };

    const assignStaff = async (staffId: string) => {
        if (!selectedOutlet) return;
        try {
            await api.put(`/api/workers/${staffId}`, { outletId: selectedOutlet.id });

            // Optimistic Update
            setAllStaff(prev => prev.map(s =>
                s.id === staffId ? { ...s, outletId: selectedOutlet.id, status: 'Assigned' } : s
            ));
        } catch (error) {
            console.error('Failed to assign staff:', error);
            alert('Gagal menetapkan staff.');
            fetchData(); // Revert on failure
        }
    };

    const unassignStaff = async (staffId: string) => {
        try {
            await api.put(`/api/workers/${staffId}`, { outletId: null });

            // Optimistic Update
            setAllStaff(prev => prev.map(s =>
                s.id === staffId ? { ...s, outletId: null, status: 'Available' } : s
            ));
        } catch (error) {
            console.error('Failed to unassign staff:', error);
            alert('Gagal menghapus staff dari outlet.');
            fetchData(); // Revert on failure
        }
    };

    return {
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
        unassignStaff,
        loading
    };
};
