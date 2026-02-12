import { useState, useMemo } from 'react';
import { Staff, Outlet } from '../types';

// Mock Data
const MOCK_OUTLETS: Outlet[] = [
    { id: 1, name: 'Outlet Pusat', location: 'Jakarta Selatan', description: 'Main Operation Hub', color: 'bg-purple-500' },
    { id: 2, name: 'Cabang Bandung', location: 'Bandung Utara', description: 'High Traffic Area', color: 'bg-blue-500' },
    { id: 3, name: 'Cabang Surabaya', location: 'Surabaya Timur', description: 'New Opening', color: 'bg-orange-500' },
];

const MOCK_STAFF: Staff[] = [
    { id: 101, name: 'Budi Santoso', role: 'Admin Outlet', status: 'Assigned', avatar: 'https://i.pravatar.cc/150?u=budi', outletId: 1 },
    { id: 102, name: 'Siti Aminah', role: 'Staff Laundry', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=siti', outletId: null },
    { id: 103, name: 'Rudi Hartono', role: 'Driver', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=rudi', outletId: null },
    { id: 104, name: 'Dewi Sartika', role: 'Staff Laundry', status: 'Assigned', avatar: 'https://i.pravatar.cc/150?u=dewi', outletId: 2 },
    { id: 105, name: 'Ahmad Fauzi', role: 'Driver', status: 'Assigned', avatar: 'https://i.pravatar.cc/150?u=ahmad', outletId: 1 },
    { id: 106, name: 'Maya Sari', role: 'Admin Outlet', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=maya', outletId: null },
    { id: 107, name: 'Joko Widodo', role: 'Staff Laundry', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=joko', outletId: null },
];

export const useStaffAssignment = () => {
    const [outlets] = useState<Outlet[]>(MOCK_OUTLETS);
    const [allStaff, setAllStaff] = useState<Staff[]>(MOCK_STAFF);

    const [selectedOutletId, setSelectedOutletId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'admin' | 'staff' | 'driver'>('all');

    // Search states
    const [outletSearch, setOutletSearch] = useState('');
    const [staffSearch, setStaffSearch] = useState('');

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




    const selectOutlet = (id: number) => {
        setSelectedOutletId(id);
    };

    const assignStaff = (staffId: number) => {
        if (!selectedOutlet) return;
        setAllStaff(prev => prev.map(s =>
            s.id === staffId ? { ...s, outletId: selectedOutlet.id, status: 'Assigned' } : s
        ));
    };

    const unassignStaff = (staffId: number) => {
        setAllStaff(prev => prev.map(s =>
            s.id === staffId ? { ...s, outletId: null, status: 'Available' } : s
        ));
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
        unassignStaff
    };
};
