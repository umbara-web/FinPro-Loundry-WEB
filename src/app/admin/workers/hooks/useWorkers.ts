'use client';

import { useState, useMemo, useEffect } from 'react';
import { Worker, WorkerFormData } from '../types';
import api from '@/src/app/utils/api';
import { Outlet } from '../../outlet/types';

import { useAuth } from '@/src/context/AuthContext';

export const useWorkers = () => {
    const { user } = useAuth();
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('Semua Role');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch Workers and Outlets
    const fetchData = async () => {
        try {
            setLoading(true);

            // Define outlet fetch promise based on role
            let outletPromise;
            if (user?.role === 'OUTLET_ADMIN' && user?.outlet_id) {
                outletPromise = api.get(`/api/outlets/${user.outlet_id}`)
                    .then(res => Array.isArray(res.data) ? res.data : [res.data]);
            } else if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
                // Fetch all outlets for admin users
                outletPromise = api.get('/api/outlets').then(res => res.data.data || res.data);
            } else {
                outletPromise = Promise.resolve([]);
            }

            const [workersRes, outletsData] = await Promise.all([
                api.get('/api/workers'),
                outletPromise
            ]);

            setOutlets(outletsData);

            // Map backend data to frontend interface
            // Handle pagination structure: res.data = { data: [], meta: {} }
            const workersData = workersRes.data.data || workersRes.data;

            // Backend returns Staff records with nested relations:
            // w.staff = User (name, email, phone, isVerified)
            // w.outlet = Outlet (name)
            // w.staff_type = role enum (WORKER, OUTLET_ADMIN, DRIVER)
            const mappedWorkers = Array.isArray(workersData) ? workersData.map((w: any) => ({
                id: w.id,
                name: w.staff?.name || w.name || '-',
                email: w.staff?.email || w.email || '-',
                phone: w.staff?.phone || w.phone || '-',
                role: mapBackendRoleToFrontend(w.staff_type || w.role),
                outlet: w.outlet?.name || '-',
                status: (w.staff?.isVerified !== false ? 'Active' : 'Inactive') as Worker['status']
            })) : [];

            setWorkers(mappedWorkers);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Helper to map roles
    const mapBackendRoleToFrontend = (role: string): Worker['role'] => {
        const map: Record<string, Worker['role']> = {
            'WORKER': 'Pekerja',
            'ADMIN_OUTLET': 'Admin Outlet',
            'OUTLET_ADMIN': 'Admin Outlet',
            'DRIVER': 'Driver',
        };
        return map[role] || 'Pekerja';
    };

    const mapFrontendRoleToBackend = (role: string) => {
        const map: Record<string, string> = {
            'Pekerja': 'WORKER',
            'Admin Outlet': 'OUTLET_ADMIN',
            'Driver': 'DRIVER'
        };
        return map[role] || 'WORKER';
    };

    const filteredWorkers = useMemo(() => {
        return workers.filter(worker => {
            const matchesSearch = (worker.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (worker.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (worker.phone?.includes(searchTerm) || false);

            const matchesRole = roleFilter === 'Semua Role' || worker.role === roleFilter;
            const matchesStatus = statusFilter === 'Semua Status' || worker.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [workers, searchTerm, roleFilter, statusFilter]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter, statusFilter]);

    // Pagination
    const totalItems = filteredWorkers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedWorkers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredWorkers.slice(start, start + itemsPerPage);
    }, [filteredWorkers, currentPage, itemsPerPage]);

    const addWorker = async (data: WorkerFormData) => {
        try {
            console.log('Adding worker with data:', data);

            // Find outlet ID based on name input
            // Note: This matches loose string input to outlet name
            const matchedOutlet = outlets.find(o => o.name.toLowerCase() === data.outlet.toLowerCase());

            if (!matchedOutlet) {
                console.error('Outlet not found:', data.outlet);
                alert('Outlet tidak ditemukan. Silakan pilih outlet yang tersedia.');
                return;
            }

            const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: mapFrontendRoleToBackend(data.role),
                status: data.status,
                outletId: matchedOutlet?.id
            };

            console.log('Sending worker payload:', payload);
            const res = await api.post('/api/workers', payload);
            console.log('Add worker response:', res.data);
            fetchData(); // Refresh
        } catch (error: any) {
            console.error('Failed to add worker:', error);
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Gagal menambahkan worker';
            alert(errorMessage);
        }
    };

    const updateWorker = async (id: number | string, data: WorkerFormData) => {
        try {
            const matchedOutlet = outlets.find(o => o.name.toLowerCase() === data.outlet.toLowerCase());

            const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: mapFrontendRoleToBackend(data.role),
                status: data.status,
                outletId: matchedOutlet?.id
            };

            await api.put(`/api/workers/${id}`, payload);
            fetchData();
        } catch (error) {
            console.error('Failed to update worker:', error);
            alert('Gagal mengupdate worker');
        }
    };

    const deleteWorker = async (id: number | string) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            try {
                await api.delete(`/api/workers/${id}`);
                fetchData();
            } catch (error) {
                console.error('Failed to delete:', error);
                alert('Gagal menghapus worker');
            }
        }
    };

    return {
        workers: paginatedWorkers,
        outlets,
        addWorker,
        updateWorker,
        deleteWorker,
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems,
        itemsPerPage
    };
};
