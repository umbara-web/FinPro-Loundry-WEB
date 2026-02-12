import { useState, useEffect, useCallback } from 'react';
import { Address } from '../types';
import api from '@/utils/api';

export const useAddresses = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadAddresses = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get('/api/addresses');
            setAddresses(res.data);
        } catch (e) {
            setError('Gagal memuat alamat penjemputan');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAddresses();
    }, [loadAddresses]);

    const addAddress = async (newAddress: Omit<Address, 'id'>) => {
        try {
            await api.post('/api/addresses', newAddress);
            loadAddresses(); // Refresh
        } catch (e) {
            console.error('Gagal menambah alamat:', e);
            alert('Gagal menambah alamat');
        }
    };

    const deleteAddress = async (id: string) => {
        if (!confirm('Hapus alamat ini?')) return;
        try {
            await api.delete(`/api/addresses/${id}`);
            loadAddresses();
        } catch (e) {
            console.error('Gagal menghapus alamat:', e);
        }
    };

    return { addresses, loading, error, addAddress, deleteAddress };
};
