import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import { ItemFormData } from '../../types';

export const useAddItem = () => {
    const router = useRouter();

    const [formData, setFormData] = useState<ItemFormData>({
        name: '',
        category: 'Cuci Setrika',
        unit: 'kg',
        price: '',
        status: 'Aktif',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.category || !formData.unit || !formData.status) {
            alert('Semua field harus diisi!');
            return;
        }

        try {
            await api.post('/api/items', {
                name: formData.name,
                category: formData.category,
                unit: formData.unit,
                price: formData.price,
                status: formData.status
            });

            alert('Item berhasil ditambahkan!');
            router.push('/admin/item');
        } catch (error) {
            console.error('Failed to add item:', error);
            alert('Gagal menambahkan item. Silakan coba lagi.');
        }
    };

    return {
        formData,
        handleInputChange,
        handleAddItem
    };
};
