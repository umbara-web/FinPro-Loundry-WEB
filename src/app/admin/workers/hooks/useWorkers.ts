import { useState, useMemo, useEffect } from 'react';
import { Worker, WorkerFormData } from '../types';
import api from '@/utils/api';
import { Outlet } from '../../outlet/types';

export const useWorkers = () => {
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('Semua Role');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [loading, setLoading] = useState(true);

    // Fetch Workers and Outlets
    const fetchData = async () => {
        try {
            setLoading(true);
            const [workersRes, outletsRes] = await Promise.all([
                api.get('/api/workers'),
                api.get('/api/outlets')
            ]);

            setOutlets(outletsRes.data);

            // Map backend data to frontend interface
            const mappedWorkers = workersRes.data.map((w: any) => ({
                id: w.id,
                name: w.name,
                email: w.email,
                phone: w.phone || '-',
                role: mapBackendRoleToFrontend(w.role),
                outlet: w.outlet?.name || '-',
                status: w.status
            }));

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

    const filteredWorkers = useMemo(() => {
        return workers.filter(worker => {
            const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                worker.phone.includes(searchTerm);

            const matchesRole = roleFilter === 'Semua Role' || worker.role === roleFilter;
            const matchesStatus = statusFilter === 'Semua Status' || worker.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [workers, searchTerm, roleFilter, statusFilter]);

    const addWorker = async (data: WorkerFormData) => {
        try {
            // Find outlet ID based on name input
            // Note: This matches loose string input to outlet name
            const matchedOutlet = outlets.find(o => o.name.toLowerCase() === data.outlet.toLowerCase());

            const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: mapFrontendRoleToBackend(data.role),
                status: data.status,
                outletId: matchedOutlet?.id // If not found, it will be undefined (acceptable if optional, but logic might require it)
            };

            await api.post('/api/workers', payload);
            fetchData(); // Refresh
        } catch (error) {
            console.error('Failed to add worker:', error);
            alert('Gagal menambahkan worker');
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
        workers: filteredWorkers,
        addWorker,
        updateWorker,
        deleteWorker,
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter
    };
};
