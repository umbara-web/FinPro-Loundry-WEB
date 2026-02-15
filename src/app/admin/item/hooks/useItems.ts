import { useState, useMemo, useEffect, useCallback } from 'react';
import api from '@/src/app/utils/api';
import { LaundryItem, ItemFormData } from '../types';
import { toast } from 'sonner';

// Map backend enum values to frontend display values
const mapCategory = (cat: string): string => {
    switch (cat) {
        case 'CUCI_SETRIKA': return 'Cuci Setrika';
        case 'SATUAN': return 'Satuan';
        case 'DRY_CLEAN': return 'Dry Clean';
        default: return cat;
    }
};

const mapUnit = (unit: string): string => {
    switch (unit) {
        case 'KG': return 'kg';
        case 'PCS': return 'pcs';
        case 'M2': return 'm²';
        default: return unit;
    }
};

const mapStatus = (status: string): string => {
    switch (status) {
        case 'ACTIVE': return 'Aktif';
        case 'INACTIVE': return 'Non-Aktif';
        default: return status;
    }
};

export const useItems = () => {
    const [laundryItems, setLaundryItems] = useState<LaundryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Semua Kategori');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState<LaundryItem | null>(null);
    const [editFormData, setEditFormData] = useState<ItemFormData>({
        name: '',
        category: 'Cuci Setrika',
        unit: 'kg',
        status: 'Aktif',
    });

    // Load items from API
    const fetchItems = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/items');
            const raw = Array.isArray(response.data) ? response.data : [];
            // Map backend enums to display values
            const mapped: LaundryItem[] = raw.map((item: any) => ({
                id: item.id,
                name: item.name,
                category: mapCategory(item.category),
                unit: mapUnit(item.unit),
                status: mapStatus(item.status),
            }));
            setLaundryItems(mapped);
        } catch (error) {
            console.error('Failed to fetch items:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, statusFilter]);

    // Get unique categories for filter options
    const uniqueCategories = useMemo(() => {
        const categories = [
            ...new Set(laundryItems.map((item) => item.category)),
        ];
        return categories;
    }, [laundryItems]);

    // Filter items
    const filteredItems = useMemo(() => {
        return laundryItems.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                categoryFilter === 'Semua Kategori' ||
                item.category === categoryFilter;
            const matchesStatus =
                statusFilter === 'Semua Status' || item.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [laundryItems, searchTerm, categoryFilter, statusFilter]);

    // Pagination
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Handlers
    const handleDeleteItem = async (itemId: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            try {
                await api.delete(`/api/items/${itemId}`);
                setLaundryItems(prev => prev.filter(item => item.id !== itemId));
                toast.success('Item berhasil dihapus');
            } catch (error) {
                console.error('Failed to delete item:', error);
                toast.error('Gagal menghapus item.');
            }
        }
    };

    const handleEditItem = (item: LaundryItem) => {
        setEditingItem(item);
        setEditFormData({
            name: item.name,
            category: item.category,
            unit: item.unit,
            status: item.status,
        });
        setShowEditModal(true);
    };

    const handleEditInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateItem = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editFormData.name || !editingItem) {
            toast.error('Nama harus diisi!');
            return;
        }

        try {
            await api.put(`/api/items/${editingItem.id}`, {
                name: editFormData.name,
                category: editFormData.category,
                unit: editFormData.unit,
                status: editFormData.status,
            });

            toast.success('Item berhasil diperbarui!');
            setShowEditModal(false);
            setEditingItem(null);
            fetchItems(); // Refresh data from server
        } catch (error) {
            console.error('Failed to update item:', error);
            toast.error('Gagal memperbarui item.');
        }
    };

    return {
        laundryItems,
        loading,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        showEditModal,
        setShowEditModal,
        editingItem,
        editFormData,
        uniqueCategories,
        filteredItems,
        currentItems,
        totalItems,
        totalPages,
        handleDeleteItem,
        handleEditItem,
        handleEditInputChange,
        handleUpdateItem,
    };
};
