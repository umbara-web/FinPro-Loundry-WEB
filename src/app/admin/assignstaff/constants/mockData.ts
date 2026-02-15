import { Outlet, Staff } from '../types';

export const outlets: Outlet[] = [
    {
        id: 1,
        name: 'Laundry Cabang Jakarta',
        location: 'Jl. Fatmawati Raya No. 12, Jakarta',
        description: 'Cabang Utama Jakarta Selatan',
        color: 'bg-red-500'
    },
    {
        id: 2,
        name: 'Laundry Cabang Bandung',
        location: 'Jl. Ahmad Yani, Bandung',
        description: 'Cabang Bandung Pusat',
        color: 'bg-blue-500'
    },
    {
        id: 3,
        name: 'Laundry Cabang Surabaya',
        location: 'Jl. Margonda, Surabaya',
        description: 'Cabang Surabaya Timur',
        color: 'bg-green-500'
    },
    {
        id: 4,
        name: 'Laundry Cabang Semarang',
        location: 'Jl. Pandanaran No. 5, Semarang',
        description: 'Cabang Semarang Kota',
        color: 'bg-yellow-500'
    },
    {
        id: 5,
        name: 'Laundry Cabang Yogyakarta',
        location: 'Jl. Malioboro No. 1, Yogyakarta',
        description: 'Cabang Yogyakarta Pusat',
        color: 'bg-purple-500'
    },
];

export const availableStaffData: Staff[] = [
    {
        id: 1, name: 'Sarah Melati', role: 'Admin',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=1',
        outletId: null
    },
    {
        id: 2, name: 'Budi Santoso', role: 'Worker',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=2',
        outletId: null
    },
    {
        id: 3, name: 'Anton Budi', role: 'Driver',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=3',
        outletId: null
    },
    {
        id: 4, name: 'Deni ', role: 'Worker',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=4',
        outletId: null
    },
    {
        id: 5, name: 'Ahmad Rahman', role: 'Admin',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=5',
        outletId: null
    },
    {
        id: 6, name: 'Sumantri', role: 'Driver',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=6',
        outletId: null
    },
    {
        id: 7, name: 'Andi Pratama', role: 'Admin',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=7',
        outletId: null
    },
    {
        id: 8, name: 'Dewi Lestari', role: 'Worker',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=8',
        outletId: null
    },
    {
        id: 9, name: 'Rizky Ramadhan', role: 'Driver',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=9',
        outletId: null
    },
    {
        id: 10, name: 'Siti Nurhaliza', role: 'Worker',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=10',
        outletId: null
    },
];

export const initialAssignedStaff: Staff[] = [
    {
        id: 7, name: 'Andi Pratama', role: 'Admin',
        status: 'Assigned',
        avatar: 'https://i.pravatar.cc/150?u=7',
        outletId: 1
    },
    {
        id: 8, name: 'Dewi Lestari', role: 'Worker',
        status: 'Assigned',
        avatar: 'https://i.pravatar.cc/150?u=8',
        outletId: 1
    },
    {
        id: 9, name: 'Rizky Ramadhan', role: 'Driver',
        status: 'Assigned',
        avatar: 'https://i.pravatar.cc/150?u=9',
        outletId: 1
    },
    {
        id: 10, name: 'Siti Nurhaliza', role: 'Worker',
        status: 'Assigned',
        avatar: 'https://i.pravatar.cc/150?u=10',
        outletId: 1
    },
];
