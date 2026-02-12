import { useState, useMemo, useEffect } from 'react';
import api from '@/utils/api';
// import { orders } from '../constants/mockData'; // No longer needed

export const useOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOutlet, setSelectedOutlet] = useState('Semua Outlet');
    const [selectedStatus, setSelectedStatus] = useState('Semua Status');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/api/orders');
                // Map backend data to frontend structure expected by OrderTable
                const mappedOrders = res.data.map((o: any) => ({
                    id: o.invoiceId || o.id,
                    customer: o.user?.name || 'Unknown',
                    type: o.serviceType === 'WASH_AND_FOLD' ? 'Regular' : o.serviceType, // Simple mapping
                    outlet: o.outlet?.name || 'Unknown',
                    status: o.status,
                    amount: `Rp ${o.totalAmount.toLocaleString('id-ID')}`,
                    date: new Date(o.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
                }));
                setOrders(mappedOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesOutlet =
                selectedOutlet === 'Semua Outlet' || order.outlet.trim() === selectedOutlet;

            const matchesStatus =
                selectedStatus === 'Semua Status' || order.status === selectedStatus;

            return matchesSearch && matchesOutlet && matchesStatus;
        });
    }, [orders, searchTerm, selectedOutlet, selectedStatus]);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

    return {
        searchTerm,
        setSearchTerm,
        selectedOutlet,
        setSelectedOutlet,
        selectedStatus,
        setSelectedStatus,
        currentPage,
        setCurrentPage,
        paginatedOrders,
        totalPages,
        totalItems: filteredOrders.length,
        itemsPerPage,
        loading
    };
};
