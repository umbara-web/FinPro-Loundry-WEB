import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, color }) => (
    <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800">
        <p className="text-slate-400 text-sm mb-4">{title}</p>
        <h3 className="text-3xl font-bold mb-2">{value}</h3>
        <p className={`text-xs ${color}`}>{trend}</p>
    </div>
);

const OrderStats: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Order" value="1,240" trend="+12% from yesterday" color="text-emerald-400" />
            <StatCard title="Pick Up" value="85" trend="+5%" color="text-emerald-400" />
            <StatCard title="Sedang Proses" value="432" trend="+2%" color="text-emerald-400" />
            <StatCard title="Pendapatan (bulan)" value="Rp 450M+" trend="+8% vs last month" color="text-emerald-400" />
        </div>
    );
};

export default OrderStats;
