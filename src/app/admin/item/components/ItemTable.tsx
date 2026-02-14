import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { LaundryItem } from '../types';

interface ItemTableProps {
    items: LaundryItem[];
    loading: boolean;
    onEdit: (item: LaundryItem) => void;
    onDelete: (id: string) => void;
}

const getCategoryStyle = (category: string) => {
    switch (category) {
        case 'Cuci Setrika':
            return 'bg-blue-500/10 text-blue-400';
        case 'Satuan':
            return 'bg-purple-500/10 text-purple-400';
        case 'Dry Clean':
            return 'bg-orange-500/10 text-orange-400';
        default:
            return 'bg-gray-500/10 text-gray-400';
    }
};

const ItemTable: React.FC<ItemTableProps> = ({ items, loading, onEdit, onDelete }) => {
    return (
        <table className="w-full text-left">
            <thead className="bg-[#233648]/40 border-b border-gray-800">
                <tr className="text-[10px] font-bold text-[#92ADC9] uppercase tracking-widest">
                    <th className="px-6 py-4">Gambar</th>
                    <th className="px-6 py-4">Nama Item</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Harga / Unit</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
                {loading ? (
                    <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-400">
                            Loading items...
                        </td>
                    </tr>
                ) : items.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-400">
                            Tidak ada item ditemukan.
                        </td>
                    </tr>
                ) : (
                    items.map((item) => (
                        <tr
                            key={item.id}
                            className="hover:bg-[#233648]/20 transition-colors group"
                        >
                            <td className="px-6 py-4">
                                <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                    <img
                                        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`}
                                        alt="item"
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm font-bold text-white">{item.name}</div>
                                <div className="text-[10px] text-gray-500">ID: #{item.id}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${getCategoryStyle(
                                        item.category
                                    )}`}
                                >
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-bold text-white">
                                    Rp {item.price.toLocaleString()}
                                </span>
                                <span className="text-[10px] text-gray-500 ml-1">
                                    / {item.unit}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div
                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold w-fit ${item.status === 'Aktif' || item.status === 'ACTIVE'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.2)]'
                                        : 'bg-gray-500/10 text-gray-400'
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${item.status === 'Aktif' || item.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                                            }`}
                                    />
                                    {item.status === 'ACTIVE' ? 'Active' : item.status === 'INACTIVE' ? 'Inactive' : item.status}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-gray-400 hover:text-[#137FEC] hover:bg-[#137FEC]/10 rounded-lg transition-all"
                                    >
                                        <Edit3 size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default ItemTable;
