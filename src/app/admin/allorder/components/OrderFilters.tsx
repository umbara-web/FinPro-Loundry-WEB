import React from 'react';
import { Search } from 'lucide-react';

interface OrderFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedOutlet: string;
    setSelectedOutlet: (value: string) => void;
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
    outletOptions?: string[];
    statusOptions?: string[];
}

const FilterSelect = ({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
}) => (
    <div className="w-full sm:w-48">
        <label className="block text-xs text-slate-400 mb-2 font-bold">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 px-3 focus:outline-none focus:border-teal-500 text-sm"
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

const OrderFilters: React.FC<OrderFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    selectedOutlet,
    setSelectedOutlet,
    selectedStatus,
    setSelectedStatus,
    outletOptions,
    statusOptions,
}) => {
    // Default options if not provided
    const defaultOutletOptions = ['Semua Outlet', 'Jakarta', 'Bandung', 'Surabaya'];
    const defaultStatusOptions = ['Semua Status', 'Mencuci', 'Selesai', 'Pick Up'];

    return (
        <div className="p-6 border-b border-slate-800 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[300px]">
                <label className="block text-xs text-slate-400 mb-2 italic">
                    Cari berdasarkan nomor Order atau Nama Kostumer...
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-teal-500"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <FilterSelect
                label="Lokasi Outlet"
                value={selectedOutlet}
                onChange={setSelectedOutlet}
                options={outletOptions || defaultOutletOptions}
            />
            <FilterSelect
                label="Order Status"
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={statusOptions || defaultStatusOptions}
            />
        </div>
    );
};

export default OrderFilters;
