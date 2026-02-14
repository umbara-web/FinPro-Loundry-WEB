import { Outlet, Staff } from '@/app/admin/assignstaff/types';

export const outlets: Outlet[] = [
    { id: 1, name: 'Laundry Cabang Jakarta', location: 'Jakarta Selatan', description: 'Main Hub', color: 'bg-purple-500' },
    { id: 2, name: 'Laundry Cabang Bandung', location: 'Bandung', description: 'Branch', color: 'bg-blue-500' },
    { id: 3, name: 'Laundry Cabang Surabaya', location: 'Surabaya', description: 'Branch', color: 'bg-green-500' },
    { id: 4, name: 'Laundry Cabang Semarang', location: 'Semarang', description: 'Branch', color: 'bg-red-500' },
    { id: 5, name: 'Laundry Cabang Yogyakarta', location: 'Yogyakarta', description: 'Branch', color: 'bg-yellow-500' },
];

export const availableStaffData: Staff[] = [
    {
        id: 1, name: 'Sarah Melati', role: 'Admin Outlet',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        outletId: null
    },
    {
        id: 2, name: 'Budi Santoso', role: 'Staff Laundry',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=budi',
        outletId: null
    },
    {
        id: 3, name: 'Anton Budi', role: 'Driver',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=anton',
        outletId: null
    },
    {
        id: 4, name: 'Deni ', role: 'Staff Laundry',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=deni',
        outletId: null
    },
    {
        id: 5, name: 'Ahmad Rahman', role: 'Admin Outlet',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=ahmad',
        outletId: null
    },
    {
        id: 6, name: 'Sumantri', role: 'Driver',
        status: 'Available',
        avatar: 'https://i.pravatar.cc/150?u=sumantri',
        outletId: null
    },
    { id: 7, name: 'Andi Pratama', role: 'Admin Outlet', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=andi', outletId: null },
    { id: 8, name: 'Dewi Lestari', role: 'Staff Laundry', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=dewi', outletId: null },
    { id: 9, name: 'Rizky Ramadhan', role: 'Driver', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=rizky', outletId: null },
    { id: 10, name: 'Siti Nurhaliza', role: 'Staff Laundry', status: 'Available', avatar: 'https://i.pravatar.cc/150?u=siti', outletId: null },
];

