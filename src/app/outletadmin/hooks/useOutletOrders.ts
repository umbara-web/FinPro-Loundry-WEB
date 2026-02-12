import { useState, useMemo } from 'react';
import { Order } from '@/app/outletadmin/types';
import { MOCK_ORDERS } from '@/app/outletadmin/constants';

export const useOutletOrders = () => {
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [dateFilter, setDateFilter] = useState<'All' | 'Today'>('All');
    const [employeeFilter, setEmployeeFilter] = useState<string>('All');

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === 'All' || order.status === filterStatus;

            // Mock date filtering logic
            const matchesDate = dateFilter === 'All' || (dateFilter === 'Today' && order.date.includes('Today'));

            const matchesEmployee = employeeFilter === 'All' || order.assigned === employeeFilter;

            return matchesSearch && matchesStatus && matchesDate && matchesEmployee;
        });
    }, [orders, searchTerm, filterStatus, dateFilter, employeeFilter]);

    const createOrder = (newOrderData: Omit<Order, 'id' | 'date' | 'status' | 'total' | 'paid'>) => {
        const newOrder: Order = {
            id: `#LD-${2300 + orders.length + 1}`,
            date: "Today, Now",
            status: "Pending",
            total: "Rp 0", // Calculated in backend usually
            paid: false,
            ...newOrderData
        };
        setOrders([newOrder, ...orders]);
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
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage
    };
};
