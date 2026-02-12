import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { ITEM_CATEGORIES, ITEM_STATUSES } from '../constants';

interface ItemFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    categoryFilter: string;
    setCategoryFilter: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    uniqueCategories: string[];
}

const SelectFilter = ({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}) => (
    <div className="relative">
        <select
            className="bg-[#233648] text-white text-xs font-bold py-2.5 pl-4 pr-10 rounded-lg border-none appearance-none focus:ring-2 focus:ring-[#137FEC] cursor-pointer"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
        />
    </div>
);

const ItemFilters: React.FC<ItemFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    uniqueCategories,
}) => {
    return (
        <div className="bg-[#1C252E] p-4 rounded-xl border border-gray-800 flex gap-4 items-center mb-6">
            <div className="relative flex-1">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Cari nama item (misal: Kemeja, Karpet)..."
                    className="w-full bg-[#233648] border-none rounded-lg py-2.5 pl-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#137FEC]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex gap-3">
                <SelectFilter
                    label="Kategori"
                    options={['Semua Kategori', ...uniqueCategories]}
                    value={categoryFilter}
                    onChange={setCategoryFilter}
                />
                <SelectFilter
                    label="Status"
                    options={['Semua Status', ...ITEM_STATUSES]}
                    value={statusFilter}
                    onChange={setStatusFilter}
                />
            </div>
        </div>
    );
};

export default ItemFilters;
