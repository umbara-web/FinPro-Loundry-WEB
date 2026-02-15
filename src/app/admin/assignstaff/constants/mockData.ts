import { Outlet, Staff } from '../types';

export const outlets: Outlet[] = [
    { id: 1, name: 'Laundry Cabang Jakarta', location: 'Jl. Fatmawati Raya No. 12...', description: 'Branch Jakarta', color: 'bg-red-500' },
    { id: 2, name: 'Laundry Cabang Bandung', location: 'Jl. Ahmad Yani, Bandung', description: 'Branch Bandung', color: 'bg-blue-500' },
    { id: 3, name: 'Laundry Cabang Surabaya', location: 'Jl. Margonda, Surabaya', description: 'Branch Surabaya', color: 'bg-green-500' },
    { id: 4, name: 'Laundry Cabang Semarang', location: 'Jl. Pandanaran No. 5', description: 'Branch Semarang', color: 'bg-yellow-500' },
    { id: 5, name: 'Laundry Cabang Yogyakarta', location: 'Jl. Malioboro No. 1', description: 'Branch Yogyakarta', color: 'bg-purple-500' },
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
    { id: 7, name: 'Andi Pratama', role: 'Admin', status: 'Available', avatar: '', outletId: null },
    { id: 8, name: 'Dewi Lestari', role: 'Worker', status: 'Available', avatar: '', outletId: null },
    { id: 9, name: 'Rizky Ramadhan', role: 'Driver', status: 'Available', avatar: '', outletId: null },
    { id: 10, name: 'Siti Nurhaliza', role: 'Worker', status: 'Available', avatar: '', outletId: null },
];

export const initialAssignedStaff: Staff[] = [
    { id: 7, name: 'Andi Pratama', role: 'Admin', status: 'Assigned', avatar: '', outletId: 1 },
    { id: 8, name: 'Dewi Lestari', role: 'Worker', status: 'Assigned', avatar: '', outletId: 1 },
    { id: 9, name: 'Rizky Ramadhan', role: 'Driver', status: 'Assigned', avatar: '', outletId: 1 },
    { id: 10, name: 'Siti Nurhaliza', role: 'Worker', status: 'Assigned', avatar: '', outletId: 1 },
];
