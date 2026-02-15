import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/src/app/utils/api';
import { ItemFormData } from '../../types';
import { toast } from 'sonner';

export const useAddItem = () => {
    const router = useRouter();

    const [formData, setFormData] = useState<ItemFormData>({
        name: '',
        category: 'Cuci Setrika',
        unit: 'kg',
        status: 'Aktif',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.category || !formData.unit || !formData.status) {
            toast.error('Semua field harus diisi!');
            return;
        }

        try {
            await api.post('/api/items', {
                name: formData.name,
                category: formData.category,
                unit: formData.unit,
                status: formData.status
            });

            toast.success('Item berhasil ditambahkan!');
            router.push('/admin/item');
        } catch (error) {
            console.error('Failed to add item:', error);
            toast.error('Gagal menambahkan item. Silakan coba lagi.');
        }
    };

    return {
        formData,
        handleInputChange,
        handleAddItem
    };
};
