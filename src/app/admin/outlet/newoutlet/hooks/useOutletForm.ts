import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OutletFormData } from '../../types';
import api from '@/src/app/utils/api';

export const useOutletForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const createOutlet = async (data: OutletFormData) => {
        setLoading(true);
        try {
            const payload = {
                name: data.name,
                address: data.address,
                city: data.city,
                manager: data.manager,
                phone: data.phone,
                openTime: data.openTime,
                status: data.status,
            };

            await api.post('/api/outlets', payload);

            router.push('/admin/outlet');
            return true;
        } catch (error) {
            console.error(error);
            alert('Gagal membuat outlet baru');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { createOutlet, loading };
};
