import React from 'react';
import { SummaryStat } from './types';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface SummaryCardsProps {
    stats: SummaryStat[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
                <div key={i} className="bg-[#1C252E] border border-gray-800 p-5 rounded-2xl">
                    <p className="text-gray-400 text-xs font-medium uppercase mb-2">{stat.label}</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                            {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {stat.trend}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
