import React from 'react';
import { Calendar, Filter } from 'lucide-react';

interface ReportFilterProps {
    period: 'daily' | 'monthly' | 'yearly';
    onPeriodChange: (p: 'daily' | 'monthly' | 'yearly') => void;

    selectedOutlet: string;
    onOutletChange: (id: string) => void;

    outlets?: { id: string; name: string }[]; // Optional, only for Super Admin

    date: string; // ISO string for simplicity in mock
    onDateChange: (d: string) => void;
}

export const ReportFilter: React.FC<ReportFilterProps> = ({
    period,
    onPeriodChange,
    selectedOutlet,
    onOutletChange,
    outlets,
    date,
    onDateChange
}) => {
    return (
        <div className="flex flex-wrap gap-4 mb-8 bg-[#1C252E] p-4 rounded-2xl border border-gray-800 items-center">

            {/* Period Selector */}
            <div className="flex bg-[#131C25] p-1 rounded-xl">
                {(['daily', 'monthly', 'yearly'] as const).map((p) => (
                    <button
                        key={p}
                        onClick={() => onPeriodChange(p)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all capitalize ${period === p
                                ? 'bg-[#4FD1C5] text-black shadow-lg'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Date Picker (Simplified as text/select for now) */}
            <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => onDateChange(e.target.value)}
                    className="bg-[#131C25] border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4FD1C5]"
                />
            </div>

            {/* Outlet Selector (Conditional) */}
            {outlets && (
                <div className="relative ml-auto">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <select
                        value={selectedOutlet}
                        onChange={(e) => onOutletChange(e.target.value)}
                        className="bg-[#131C25] border border-gray-700 rounded-xl py-2 pl-10 pr-8 text-sm text-white focus:outline-none focus:border-[#4FD1C5] appearance-none"
                    >
                        <option value="all">All Outlets</option>
                        {outlets.map(o => (
                            <option key={o.id} value={o.id}>{o.name}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};
