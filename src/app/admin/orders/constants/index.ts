import { ServiceOption } from '../types';

export const TIME_SLOTS = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '13:00 - 15:00',
    '16:00 - 18:00'
];

export const SERVICES: ServiceOption[] = [
    {
        name: 'Cuci & Lipat',
        icon: 'package', // Using string key to render lucide icon component dynamically if needed, or just handle in UI
        price: 'Rp 6.000/kg',
        desc: 'Pakaian harian, kiloan, bersih dan wangi.'
    },
    {
        name: 'Setrika Saja',
        icon: 'shirt',
        price: 'Rp 4.000/kg',
        desc: 'Pakaian sudah dicuci, hanya butuh disetrika.'
    },
    {
        name: 'Dry Clean',
        icon: 'tie',
        price: 'Rp 15.000/pc',
        desc: 'Untuk pakaian spesial (Jas, Gaun, dll).'
    }
];

export const DEFAULT_ADDRESSES = [
    {
        id: 1,
        name: 'Rumah Utama',
        phone: '081234567890',
        address: 'Jl. Raya No. 123, RT 01/RW 02',
        city: 'Jakarta',
        postalCode: '12345'
    },
    {
        id: 2,
        name: 'Kantor',
        phone: '081234567891',
        address: 'Jl. Merdeka No. 456, Gedung A',
        city: 'Jakarta',
        postalCode: '12346'
    }
];
