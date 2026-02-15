import { useState, useEffect, useMemo } from 'react';
import { Outlet, OutletFormData } from '../types';
import api from '@/src/app/utils/api';
import { useAuth } from '@/src/context/AuthContext';
import { toast } from 'sonner';

export const useOutlets = () => {
    const { user } = useAuth();
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [cityFilter, setCityFilter] = useState('Semua Kota');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchOutlets = async () => {
        try {
            if (user?.role === 'OUTLET_ADMIN' && user?.outlet_id) {
                // If Outlet Admin, only fetch their specific outlet
                const res = await api.get(`/api/outlets/${user.outlet_id}?_t=${Date.now()}`);
                // Ensure result is an array or single object wrapped in array
                setOutlets(Array.isArray(res.data) ? res.data : [res.data]);
            } else if (user?.role === 'SUPER_ADMIN') {
                // If Super Admin, fetch all
                const res = await api.get(`/api/outlets?_t=${Date.now()}`);
                setOutlets(res.data);
            } else {
                // Fallback / Other roles shouldn't see this or handle appropriately
                setOutlets([]);
            }
        } catch (error) {
            console.error('Error fetching outlets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOutlets();
    }, []);

    const deleteOutlet = async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus outlet ini?')) {
            try {
                console.log('[useOutlets] Deleting outlet with id:', id);
                const res = await api.delete(`/api/outlets/${id}`);
                console.log('[useOutlets] Delete response:', res.data);

                // Remove the outlet from local state — no need to re-fetch
                setOutlets(prev => prev.filter(outlet => outlet.id !== id));
                toast.success('Outlet berhasil dihapus');
            } catch (error: any) {
                console.error('[useOutlets] Failed to delete:', error);
                console.error('[useOutlets] Response status:', error.response?.status);
                console.error('[useOutlets] Response data:', error.response?.data);
                const errorMessage = error.response?.data?.error || error.message || 'Gagal menghapus outlet';
                toast.error(errorMessage);
            }
        }
    };

    const updateOutlet = async (id: string, data: OutletFormData) => {
        try {
            await api.put(`/api/outlets/${id}`, data);
            fetchOutlets(); // Refresh
            toast.success('Outlet berhasil diupdate');
            return true;
        } catch (error) {
            console.error(error);
            toast.error('Gagal mengupdate outlet');
            return false;
        }
    };

    // Filter logic
    const cities = useMemo(() => {
        if (!outlets) return ['Semua Kota'];
        const uniqueCities = Array.from(new Set(outlets.map(outlet => outlet.city)));
        return ['Semua Kota', ...uniqueCities];
    }, [outlets]);

    const statusOptions = ['Semua Status', 'ACTIVE', 'CLOSED', 'RENOVATION'];

    const filteredOutlets = useMemo(() => {
        return outlets.filter(outlet => {
            const matchesSearch = outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                outlet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                outlet.manager.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'Semua Status' || outlet.status === statusFilter;
            const matchesCity = cityFilter === 'Semua Kota' || outlet.city === cityFilter;

            return matchesSearch && matchesStatus && matchesCity;
        });
    }, [outlets, searchTerm, statusFilter, cityFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredOutlets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOutlets = filteredOutlets.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, cityFilter]);

    return {
        outlets,
        paginatedOutlets,
        loading,
        totalItems: filteredOutlets.length,
        totalPages,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        cityFilter,
        setCityFilter,
        cities,
        statusOptions,
        deleteOutlet,
        updateOutlet
    };
};
