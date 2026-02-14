import { useState, useMemo, useEffect } from 'react';
import { Worker, WorkerFormData } from '@/app/admin/workers/types';
import api from '@/utils/api';
import { Outlet } from '@/app/admin/outlet/types';

export const useWorkers = () => {
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('Semua Role');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalWorkers, setTotalWorkers] = useState(0);
    const itemsPerPage = 5;

    // Helper to map roles
    const mapBackendRoleToFrontend = (role: string) => {
        const map: Record<string, string> = {
            'WORKER': 'Pekerja',
            'ADMIN_OUTLET': 'Admin Outlet',
            'OUTLET_ADMIN': 'Admin Outlet',
            'DRIVER': 'Driver',
            'USER': 'Pekerja' // Fallback
        };
        return map[role] || role;
    };

    const mapFrontendRoleToBackend = (role: string) => {
        const map: Record<string, string> = {
            'Pekerja': 'WORKER',
            'Admin Outlet': 'OUTLET_ADMIN',
            'Driver': 'DRIVER'
        };
        return map[role] || 'WORKER';
    };

    // Fetch Workers and Outlets
    const fetchData = async () => {
        try {
            setLoading(true);

            // Prepare params
            const params: any = {
                page: currentPage,
                limit: itemsPerPage,
                search: searchTerm,
            };

            if (roleFilter !== 'Semua Role') {
                params.role = mapFrontendRoleToBackend(roleFilter);
            }

            // Only send status if it's not "Semua Status"
            if (statusFilter !== 'Semua Status') {
                params.status = statusFilter;
            }

            const [workersRes, outletsRes] = await Promise.all([
                api.get('/api/workers', { params }),
                api.get('/api/outlets')
            ]);

            setOutlets(outletsRes.data);

            // Handle response structure { data, meta } or fallback to array
            let workerData = [];
            let totalPages = 1;
            let totalWorkers = 0;

            if (Array.isArray(workersRes.data)) {
                workerData = workersRes.data;
                totalWorkers = workerData.length;
                totalPages = Math.ceil(totalWorkers / itemsPerPage);
            } else if (workersRes.data && workersRes.data.data) {
                workerData = workersRes.data.data;
                const meta = workersRes.data.meta;
                totalPages = meta?.totalPages || 1;
                totalWorkers = meta?.total || 0;
            }

            // Map backend data to frontend interface
            const mappedWorkers = workerData.map((w: any) => ({
                id: w.id,
                name: w.staff?.name || 'Unknown',
                email: w.staff?.email || '-',
                phone: w.staff?.phone || '-',
                role: mapBackendRoleToFrontend(w.staff_type || w.staff?.role || 'WORKER'),
                outlet: w.outlet?.name || '-',
                outletId: w.outlet?.id, // Added ID
                status: 'Active'
            }));

            setWorkers(mappedWorkers);
            setTotalPages(totalPages);
            setTotalWorkers(totalWorkers);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm, roleFilter, statusFilter]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter, statusFilter]);

    const addWorker = async (data: WorkerFormData) => {
        try {
            const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: mapFrontendRoleToBackend(data.role),
                status: data.status,
                outletId: data.outlet // data.outlet is now the ID
            };

            await api.post('/api/workers', payload);
            fetchData(); // Refresh
        } catch (error: any) {
            console.error('Failed to add worker:', error);
            const msg = error.response?.data?.details || error.response?.data?.error || 'Gagal menambahkan worker';
            alert(`Gagal: ${msg}`);
        }
    };

    const updateWorker = async (id: number | string, data: WorkerFormData) => {
        try {
            const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: mapFrontendRoleToBackend(data.role),
                status: data.status,
                outletId: data.outlet // data.outlet is now the ID
            };

            await api.put(`/api/workers/${id}`, payload);
            fetchData();
        } catch (error: any) {
            console.error('Failed to update worker:', error);
            const msg = error.response?.data?.details || error.response?.data?.error || 'Gagal mengupdate worker';
            alert(`Gagal: ${msg}`);
        }
    };

    const deleteWorker = async (id: number | string) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            try {
                await api.delete(`/api/workers/${id}`);
                fetchData();
            } catch (error: any) {
                console.error('Failed to delete:', error);
                const msg = error.response?.data?.details || error.response?.data?.error || 'Gagal menghapus worker';
                alert(`Gagal: ${msg}`);
            }
        }
    };

    return {
        workers,
        totalWorkers,
        currentPage,
        totalPages,
        setCurrentPage,
        addWorker,
        updateWorker,
        deleteWorker,
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        outlets,
        loading
    };
};
