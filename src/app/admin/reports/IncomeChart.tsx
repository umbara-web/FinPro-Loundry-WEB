import React from 'react';
import { SalesData } from './types';

interface IncomeChartProps {
    data: SalesData[];
    period: 'daily' | 'monthly' | 'yearly';
}

export const IncomeChart: React.FC<IncomeChartProps> = ({ data, period }) => {
    const maxAmount = Math.max(...data.map(d => d.amount), 1); // Avoid division by zero

    return (
        <div className="bg-[#1C252E] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Income Analytics ({period})</h3>

            <div className="flex items-end justify-between h-64 gap-2">
                {data.map((item, index) => {
                    const heightPercent = (item.amount / maxAmount) * 100;
                    return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full relative flex-1 flex items-end">
                                <div
                                    className="w-full bg-[#4FD1C5]/20 group-hover:bg-[#4FD1C5] rounded-t-sm transition-all duration-300 relative"
                                    style={{ height: `${heightPercent}%` }}
                                >
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                        Rp {item.amount.toLocaleString('id-ID')}
                                    </div>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-400 rotate-0 truncate w-full text-center">
                                {item.date}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
