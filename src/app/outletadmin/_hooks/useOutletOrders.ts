import { useState, useMemo, useEffect } from 'react';
import { Order } from '@/src/app/outletadmin/_types';
import api from '@/src/app/utils/api';
import { useAuth } from '@/src/context/AuthContext';

export const useOutletOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [dateFilter, setDateFilter] = useState<'All' | 'Today'>('All');
    const [employeeFilter, setEmployeeFilter] = useState<string>('All');

    const outletId = user?.outlet_id || null;

    // Fetch Orders
    const fetchOrders = async () => {
        if (!outletId) return;
        try {
            setLoading(true);
            const res = await api.get(`/api/orders?outletId=${outletId}`);
            const mappedOrders = res.data.map((o: any) => ({
                id: `#LD-${o.id.substring(0, 6).toUpperCase()}`, // Display ID
                rawId: o.id,
                date: new Date(o.created_at).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
                customer: o.pickup_request?.customer?.name || 'Unknown',
                phone: o.pickup_request?.customer?.phone || '-',
                service: o.order_item?.[0]?.laundry_item?.name || 'Service',
                items: o.order_item?.[0]?.itemName || '-',
                quantity: o.order_item?.[0]?.qty || 0,
                weight: o.total_weight || 0,
                status: o.status === 'CREATED' ? 'Pending' : o.status === 'COMPLETED' ? 'Completed' : 'In Progress',
                assigned: o.outlet_admin?.name || 'Unassigned',
                total: `Rp ${o.price_total?.toLocaleString() || '0'}`,
                paid: !!o.paid_at
            }));
            setOrders(mappedOrders);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (outletId) {
            fetchOrders();
        }
    }, [outletId]);


    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase());

            // Map backend status to frontend filter if needed
            const matchesStatus = filterStatus === 'All' || order.status === filterStatus;

            // Simple date check
            const matchesDate = dateFilter === 'All' || (dateFilter === 'Today' && new Date(order.date).toDateString() === new Date().toDateString());

            const matchesEmployee = employeeFilter === 'All' || order.assigned === employeeFilter;

            return matchesSearch && matchesStatus && matchesDate && matchesEmployee;
        });
    }, [orders, searchTerm, filterStatus, dateFilter, employeeFilter]);

    const createOrder = async (newOrderData: Omit<Order, 'id' | 'date' | 'status' | 'total' | 'paid'>) => {
        if (!outletId) {
            alert("No outlet selected/found");
            return;
        }

        try {
            await api.post('/api/orders', {
                customerName: newOrderData.customer,
                phone: newOrderData.phone,
                serviceName: newOrderData.service,
                items: newOrderData.items,
                quantity: newOrderData.quantity,
                weight: newOrderData.weight,
                assignedStaffName: newOrderData.assigned,
                outletId: outletId
            });
            fetchOrders(); // Refresh list
        } catch (error) {
            console.error("Failed to create order", error);
            alert("Failed to create order");
        }
    };

    const updateOrder = async (orderId: string, updatedData: any) => {
        try {
            await api.put(`/api/orders/${orderId}`, updatedData);
            fetchOrders(); // Refresh list
        } catch (error) {
            console.error("Failed to update order", error);
            alert("Failed to update order");
        }
    };

    const totalOrders = filteredOrders.length;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalOrders / itemsPerPage);

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return {
        orders: paginatedOrders,
        totalOrders,
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        dateFilter,
        setDateFilter,
        employeeFilter,
        setEmployeeFilter,
        createOrder,
        updateOrder,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage
    };
};
