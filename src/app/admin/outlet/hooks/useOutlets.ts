import { useState, useEffect, useMemo } from 'react';
import { Outlet, OutletFormData } from '../types';
import api from '@/src/app/utils/api';

export const useOutlets = () => {
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [cityFilter, setCityFilter] = useState('Semua Kota');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchOutlets = async () => {
        try {
            const res = await api.get('/api/outlets');
            setOutlets(res.data);
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
                await api.delete(`/api/outlets/${id}`);
                fetchOutlets(); // Refresh list
            } catch (error) {
                console.error('Failed to delete:', error);
                alert('Gagal menghapus outlet');
            }
        }
    };

    const updateOutlet = async (id: string, data: OutletFormData) => {
        try {
            await api.put(`/api/outlets/${id}`, data);
            fetchOutlets(); // Refresh
            return true;
        } catch (error) {
            console.error(error);
            alert('Gagal mengupdate outlet');
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
