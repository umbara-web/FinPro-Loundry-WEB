import { useState, useMemo, useEffect } from 'react';
import api from '@/src/app/utils/api';
import { Order } from '../types';

// Mock Data
const MOCK_ORDERS: Order[] = [
    { id: '#INV-2024-001', customer: 'Ratih', type: 'Regular', outlet: 'Jakarta', status: 'Mencuci', amount: 'Rp 75.000', date: 'Feb 15, 2024' },
    { id: '#INV-2024-002', customer: 'Budi Santoso', type: 'VIP Member', outlet: 'Bandung', status: 'Selesai', amount: 'Rp 120.000', date: 'Feb 15, 2024' },
    { id: '#INV-2024-003', customer: 'Siti Aminah', type: 'New', outlet: 'Surabaya', status: 'Pick Up', amount: 'Rp 45.000', date: 'Feb 14, 2024' },
    { id: '#INV-2024-004', customer: 'Rudi Hartono', type: 'Regular', outlet: 'Jakarta', status: 'Selesai', amount: 'Rp 90.000', date: 'Feb 14, 2024' },
    { id: '#INV-2024-005', customer: 'Dewi Sartika', type: 'VIP Member', outlet: 'Bandung', status: 'Mencuci', amount: 'Rp 150.000', date: 'Feb 13, 2024' },
    { id: '#INV-2024-006', customer: 'Ahmad Fauzi', type: 'New', outlet: 'Surabaya', status: 'Pick Up', amount: 'Rp 60.000', date: 'Feb 13, 2024' },
    { id: '#INV-2024-007', customer: 'Maya Sari', type: 'Regular', outlet: 'Jakarta', status: 'Selesai', amount: 'Rp 85.000', date: 'Feb 12, 2024' },
    { id: '#INV-2024-008', customer: 'Bambang Wijaya', type: 'VIP Member', outlet: 'Bandung', status: 'Mencuci', amount: 'Rp 200.000', date: 'Feb 12, 2024' },
    { id: '#INV-2024-009', customer: 'Sari Indah', type: 'New', outlet: 'Surabaya', status: 'Pick Up', amount: 'Rp 55.000', date: 'Feb 11, 2024' },
    { id: '#INV-2024-010', customer: 'Joko Widodo', type: 'Regular', outlet: 'Jakarta', status: 'Selesai', amount: 'Rp 95.000', date: 'Feb 11, 2024' },
    { id: '#INV-2024-011', customer: 'Lina Kusuma', type: 'Regular', outlet: 'Bandung', status: 'Mencuci', amount: 'Rp 70.000', date: 'Feb 10, 2024' },
    { id: '#INV-2024-012', customer: 'Mira Ayu', type: 'VIP Member', outlet: 'Surabaya', status: 'Selesai', amount: 'Rp 180.000', date: 'Feb 10, 2024' },
    { id: '#INV-2024-013', customer: 'Toni Suhartono', type: 'New', outlet: 'Jakarta', status: 'Pick Up', amount: 'Rp 50.000', date: 'Feb 09, 2024' },
    { id: '#INV-2024-014', customer: 'Wati Melinda', type: 'Regular', outlet: 'Bandung', status: 'Selesai', amount: 'Rp 65.000', date: 'Feb 09, 2024' },
    { id: '#INV-2024-015', customer: 'Hendra Gunawan', type: 'VIP Member', outlet: 'Surabaya', status: 'Mencuci', amount: 'Rp 220.000', date: 'Feb 08, 2024' },
];

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOutlet, setSelectedOutlet] = useState('Semua Outlet');
    const [selectedStatus, setSelectedStatus] = useState('Semua Status');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;

    // Get unique outlets and statuses from data for filter options
    const outletOptions = useMemo(() => {
        const outlets = new Set(orders.map(o => o.outlet.trim()));
        return ['Semua Outlet', ...Array.from(outlets).sort()];
    }, [orders]);

    const statusOptions = useMemo(() => {
        const statuses = new Set(orders.map(o => o.status));
        return ['Semua Status', ...Array.from(statuses).sort()];
    }, [orders]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log('[useOrders] Fetching from /api/admin/orders...');
                const res = await api.get('/api/admin/orders');
                console.log('[useOrders] Response:', res.data);

                // Map backend data to frontend structure expected by OrderTable
                const ordersData = res.data.data || res.data;
                
                if (!ordersData || !Array.isArray(ordersData)) {
                    // Use mock data if API returns empty
                    setOrders(MOCK_ORDERS);
                    return;
                }

                // Map backend data to frontend structure expected by OrderTable
                const mappedOrders = ordersData.map((o: any) => ({
                    id: o.invoice_id || o.id,
                    customer: o.pickup_request?.customer?.name || o.user?.name || 'Unknown',
                    type: o.service_type === 'WASH_AND_FOLD' ? 'Regular' : o.service_type || 'Regular',
                    outlet: o.outlet?.name || 'Unknown',
                    status: o.status,
                    amount: `Rp ${(o.total_amount || o.totalAmount || 0).toLocaleString('id-ID')}`,
                    date: new Date(o.created_at || o.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
                }));
                setOrders(mappedOrders);
            } catch (error) {
                console.error('Failed to fetch orders, using mock data:', error);
                // Use mock data when API fails
                setOrders(MOCK_ORDERS);
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
        loading,
        outletOptions,
        statusOptions
    };
};
