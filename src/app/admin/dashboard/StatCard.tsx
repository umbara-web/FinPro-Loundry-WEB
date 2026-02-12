import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    sub: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, sub, icon, trend }) => {
    return (
        <div className="bg-[#1C252E] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <div className="p-2 bg-[#233648] rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
            </div>
            <h2 className="text-2xl font-bold mb-1">{value}</h2>
            <div className="flex items-center gap-1">
                {trend && <span className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>↑ {sub}</span>}
                {!trend && <span className="text-xs text-orange-400">{sub}</span>}
                {trend && <span className="text-[10px] text-gray-600">vs bulan lalu</span>}
            </div>
        </div>
    );
};
