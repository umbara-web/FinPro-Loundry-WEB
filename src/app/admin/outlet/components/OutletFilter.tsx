import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface OutletFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusChange: (value: string) => void;
    statusOptions: string[];
    cityFilter: string;
    onCityChange: (value: string) => void;
    cityOptions: string[];
}

export const OutletFilter: React.FC<OutletFilterProps> = ({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange,
    statusOptions,
    cityFilter,
    onCityChange,
    cityOptions,
}) => {
    return (
        <div className="bg-[#1C252E] p-4 rounded-2xl border border-gray-800 flex flex-wrap gap-4 items-center mb-8">
            <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                    className="w-full bg-[#131C25] border-none rounded-xl py-3 pl-11 text-sm text-white placeholder-gray-500"
                    placeholder="Cari nama outlet, alamat, atau ID..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <FilterSelect
                label={statusFilter}
                options={statusOptions}
                value={statusFilter}
                onChange={onStatusChange}
            />
            <FilterSelect
                label={cityFilter}
                options={cityOptions}
                value={cityFilter}
                onChange={onCityChange}
            />
        </div>
    );
};

function FilterSelect({ label, options, value, onChange }: { label: string; options?: string[]; value?: string; onChange?: (value: string) => void }) {
    if (options && onChange) {
        return (
            <div className="relative">
                <select
                    className="bg-[#131C25] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white appearance-none pr-8 min-w-[120px]"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
        );
    }

    return (
        <div className="relative">
            <select className="bg-[#131C25] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white appearance-none pr-8 min-w-[120px]">
                <option>{label}</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>
    );
}
