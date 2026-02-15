import { useState, useMemo, useEffect } from 'react';
import api from '@/src/app/utils/api';


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
                console.log('[useOrders] Fetching from /api/admin/orders...');
                const res = await api.get('/api/admin/orders');
                console.log('[useOrders] Response:', res.data);

                // Map backend data to frontend structure expected by OrderTable
                const ordersData = res.data.data || res.data;

                if (!ordersData || !Array.isArray(ordersData)) {
                    setOrders([]);
                    return;
                }

                // Map backend data to frontend structure expected by OrderTable
                const mappedOrders = ordersData.map((o: any) => ({
                    id: o.invoice_id || o.id,
                    customer: o.pickup_request?.customer?.name || o.user?.name || 'Unknown',
                    type: o.service_type === 'WASH_AND_FOLD' ? 'Regular' : o.service_type || 'Regular', // Simple mapping
                    outlet: o.outlet?.name || 'Unknown',
                    status: o.status,
                    amount: `Rp ${(o.total_amount || o.totalAmount || 0).toLocaleString('id-ID')}`,
                    date: new Date(o.created_at || o.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
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

    // Extract unique outlet names from orders for the filter dropdown
    const outletOptions = useMemo(() => {
        const uniqueOutlets = [...new Set(orders.map(o => o.outlet).filter(Boolean))];
        return ['Semua Outlet', ...uniqueOutlets.sort()];
    }, [orders]);

    // Extract unique statuses from orders for the filter dropdown
    const statusOptions = useMemo(() => {
        const uniqueStatuses = [...new Set(orders.map(o => o.status).filter(Boolean))];
        return ['Semua Status', ...uniqueStatuses.sort()];
    }, [orders]);

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
        loading,
        outletOptions,
        statusOptions
    };
};
