import { Order, Stat } from '@/app/outletadmin/types';

export const MOCK_ORDERS: Order[] = [
    { id: "#LD-2301", date: "Today, 10:30 AM", customer: "Budi Santoso", phone: "+62 812-3456-7890", service: "Wash & Fold", items: "Mixed Clothes", quantity: 15, weight: 5, status: "In Progress", assigned: "Siti A.", total: "Rp 45.000", paid: true },
    { id: "#LD-2302", date: "Today, 09:15 AM", customer: "Ani Dewi", phone: "+62 813-9988-7766", service: "Dry Clean", items: "Suits", quantity: 2, weight: 1.5, status: "Pending", assigned: null, total: "Rp 120.000", paid: false },
    { id: "#LD-2303", date: "Yesterday, 14:20 PM", customer: "Citra Kirana", phone: "+62 811-2233-4455", service: "Ironing Only", items: "Shirts", quantity: 10, weight: 3, status: "Ready", assigned: "Rudi H.", total: "Rp 35.000", paid: true },
    { id: "#LD-2304", date: "Yesterday, 11:00 AM", customer: "Doni Tata", phone: "+62 812-9988-7766", service: "Wash & Fold", items: "Bed Sheets", quantity: 4, weight: 7, status: "Completed", assigned: "Siti A.", total: "Rp 63.000", paid: true },
    { id: "#LD-2305", date: "Yesterday, 09:30 AM", customer: "Eka Saputra", phone: "+62 813-1122-3344", service: "Dry Clean", items: "Dress", quantity: 1, weight: 0.5, status: "Completed", assigned: "Dewi S.", total: "Rp 50.000", paid: true },
];

export const STATS_DATA: Stat[] = [
    { title: "Orders Today", value: "24", trend: "+12% from yesterday", icon: "calendar", iconColor: "text-teal-400" },
    { title: "Pending Pickup", value: "8", subtitle: "Needs attention", icon: "clock", iconColor: "text-yellow-500" },
    { title: "In Progress", value: "12", subtitle: "Currently washing/drying", icon: "refresh", iconColor: "text-blue-400" },
    { title: "Ready", value: "5", subtitle: "Waiting for customer", icon: "check", iconColor: "text-green-500" },
];
