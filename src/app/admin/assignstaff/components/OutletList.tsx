import React from 'react';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { Outlet } from '../types';

interface OutletListProps {
    outlets: Outlet[];
    selectedOutlet: Outlet | null;
    onSelectOutlet: (id: number | string) => void;
    searchTerm: string;
    onSearchChange: (val: string) => void;
}

const OutletList: React.FC<OutletListProps> = ({
    outlets,
    selectedOutlet,
    onSelectOutlet,
    searchTerm,
    onSearchChange
}) => {
    return (
        <div className="col-span-12 lg:col-span-3 bg-[#1C252E] rounded-2xl border border-gray-800 p-4 h-[calc(100vh-200px)] flex flex-col">
            <h3 className="font-bold text-white mb-4 px-2">Daftar Outlet</h3>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="text"
                    placeholder="Cari outlet..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-[#131C25] border border-gray-700 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:border-[#26E0C8] outline-none"
                />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {outlets.map(outlet => (
                    <button
                        key={outlet.id}
                        onClick={() => onSelectOutlet(outlet.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all group relative overflow-hidden ${selectedOutlet?.id === outlet.id
                            ? 'bg-[#26E0C8]/10 border-[#26E0C8]'
                            : 'bg-[#131C25] border-gray-800 hover:border-gray-600'
                            }`}
                    >
                        <div className={`absolute top-0 left-0 w-1 h-full ${outlet.color}`}></div>
                        <div className="pl-3">
                            <h4 className={`font-bold text-sm ${selectedOutlet?.id === outlet.id ? 'text-[#26E0C8]' : 'text-white'}`}>
                                {outlet.name}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                                <MapPin size={10} /> {outlet.location}
                            </div>
                        </div>
                        {selectedOutlet?.id === outlet.id && (
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-[#26E0C8]" size={16} />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OutletList;
