import { Outlet, Staff } from '../types';

export const outlets: Outlet[] = [
    { id: 1, name: 'Laundry Cabang Jakarta', address: 'Jl. Fatmawati Raya No. 12...', count: '12 Staff' },
    { id: 2, name: 'Laundry Cabang Bandung', address: 'Jl. Ahmad Yani, Bandung', count: '8 Staff' },
    { id: 3, name: 'Laundry Cabang Surabaya', address: 'Jl. Margonda, Surabaya', count: '5 Staff' },
    { id: 4, name: 'Laundry Cabang Semarang', address: 'Jl. Pandanaran No. 5', count: '3 Staff' },
    { id: 5, name: 'Laundry Cabang Yogyakarta', address: 'Jl. Malioboro No. 1', count: '7 Staff' },
];

export const availableStaffData: Staff[] = [
    {
        id: 1, name: 'Sarah Melati', role: 'Admin',
        status: 'Available',
        avatar: '',
        outletId: null
    },
    {
        id: 2, name: 'Budi Santoso', role: 'Worker',
        status: 'Available',
        avatar: '',
        outletId: null
    },
    {
        id: 3, name: 'Anton Budi', role: 'Driver',
        status: 'Available',
        avatar: '',
        outletId: null
    },
    {
        id: 4, name: 'Deni ', role: 'Worker',
        status: 'Available',
        avatar: '',
        outletId: null
    },
    {
        id: 5, name: 'Ahmad Rahman', role: 'Admin',
        status: 'Available',
        avatar: '',
        outletId: null
    },
    {
        id: 6, name: 'Sumantri', role: 'Driver',
        status: 'Available',
        avatar: '',
        outletId: null
    },
    { id: 7, name: 'Andi Pratama', role: 'Admin', spec: 'Manager' },
    { id: 8, name: 'Dewi Lestari', role: 'Worker', spec: 'Ironing' },
    { id: 9, name: 'Rizky Ramadhan', role: 'Driver', spec: 'Pick-up' },
    { id: 10, name: 'Siti Nurhaliza', role: 'Worker', spec: 'Washing' },
];

export const initialAssignedStaff: Staff[] = [
    { id: 7, name: 'Andi Pratama', role: 'Admin', spec: 'Manager' },
    { id: 8, name: 'Dewi Lestari', role: 'Worker', spec: 'Ironing' },
    { id: 9, name: 'Rizky Ramadhan', role: 'Driver', spec: 'Pick-up' },
    { id: 10, name: 'Siti Nurhaliza', role: 'Worker', spec: 'Washing' },
];
