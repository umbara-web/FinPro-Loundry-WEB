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
            return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'Satuan':
            return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'Dry Clean':
            return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        default:
            return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};

const ItemTable: React.FC<ItemTableProps> = ({ items, loading, onEdit, onDelete }) => {
    return (
        <table className="w-full text-left">
            <thead className="bg-[#233648]/40 border-b border-gray-800">
                <tr className="text-[10px] font-bold text-[#92ADC9] uppercase tracking-widest">
                    <th className="px-6 py-4 w-16">Gambar</th>
                    <th className="px-6 py-4">Nama Item</th>
                    <th className="px-6 py-4 w-36">Kategori</th>
                    <th className="px-6 py-4 w-24">Unit</th>
                    <th className="px-6 py-4 w-28">Status</th>
                    <th className="px-6 py-4 w-24 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
                {loading ? (
                    <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-400">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                Loading items...
                            </div>
                        </td>
                    </tr>
                ) : items.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-400">
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
                                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                    <img
                                        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`}
                                        alt="item"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm font-bold text-white">{item.name}</div>
                                <div className="text-[10px] text-gray-500 mt-0.5 font-mono">ID: {item.id.slice(0, 8)}...</div>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getCategoryStyle(
                                        item.category
                                    )}`}
                                >
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-300 font-medium">{item.unit}</span>
                            </td>
                            <td className="px-6 py-4">
                                {item.status === 'Aktif' ? (
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold w-fit bg-green-500/15 text-green-400 border border-green-500/30 shadow-[0_0_8px_rgba(34,197,94,0.3),0_0_20px_rgba(34,197,94,0.15)]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.8)] animate-pulse" />
                                        Aktif
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold w-fit bg-gray-500/10 text-gray-400 border border-gray-600/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                        Non-Aktif
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-1">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-gray-400 hover:text-[#137FEC] hover:bg-[#137FEC]/10 rounded-lg transition-all"
                                        title="Edit"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                        title="Hapus"
                                    >
                                        <Trash2 size={16} />
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
