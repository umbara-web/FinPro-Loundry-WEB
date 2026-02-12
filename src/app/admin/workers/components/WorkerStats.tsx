import React from 'react';
import { Users, Building2, UserCheck, Truck } from 'lucide-react';

export const WorkerStats: React.FC = () => {
    const stats = [
        { label: 'Total Pengguna', value: '1,240', change: '+12% bulan ini', icon: <Users className="text-gray-600" /> },
        { label: 'Admin Outlet', value: '12', icon: <Building2 className="text-gray-600" /> },
        { label: 'Pekerja Aktif', value: '45', icon: <UserCheck className="text-gray-600" /> },
        { label: 'Driver Aktif', value: '28', icon: <Truck className="text-gray-600" /> },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-slate-400 text-xs">{stat.label}</p>
                        {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    {stat.change && <p className="text-emerald-400 text-[10px] mt-1">↗ {stat.change}</p>}
                </div>
            ))}
        </div>
    );
};
