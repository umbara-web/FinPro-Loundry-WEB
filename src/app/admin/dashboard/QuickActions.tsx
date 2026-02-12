import React from 'react';
import Link from 'next/link';
import { Store, UserPlus, CheckCircle2, Package } from 'lucide-react';

interface QuickActionProps {
    icon: React.ReactNode;
    label: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label }) => {
    return (
        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-[#1C252E] rounded-2xl border border-dashed border-gray-700 hover:border-blue-500 hover:bg-blue-500/5 transition-all group w-full h-full">
            <div className="p-3 bg-blue-500/10 rounded-full text-blue-500 group-hover:scale-110 transition-transform">{icon}</div>
            <span className="text-xs font-medium text-gray-400 group-hover:text-white text-center">{label}</span>
        </button>
    );
};

export const QuickActions: React.FC = () => {
    return (
        <>
            <h3 className="text-lg font-bold mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 items-center">
                <Link href="/admin/outlet"><QuickAction icon={<Store size={24} />} label="Tambah Outlet" /></Link>
                <Link href="/"><QuickAction icon={<UserPlus size={24} />} label="Daftar User" /></Link>
                <Link href="/admin/item"><QuickAction icon={<CheckCircle2 size={24} />} label="Item Laundry" /></Link>
                <Link href="/"><QuickAction icon={<Package size={20} />} label="Penempatan Karyawan" /></Link>
            </div>
        </>
    );
};
