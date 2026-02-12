import React from 'react';
import { X } from 'lucide-react';
import { ItemFormData, LaundryItem } from '../types';
import { ITEM_CATEGORIES, ITEM_UNITS, ITEM_STATUSES } from '../constants';

interface EditItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    editingItem: LaundryItem | null;
    formData: ItemFormData;
    onInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editingItem,
    formData,
    onInputChange,
}) => {
    if (!isOpen || !editingItem) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1C252E] rounded-2xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white">Edit Item</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={onSubmit} className="p-6 space-y-6">
                    {/* Item ID (Read-only) */}
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            ID Item
                        </label>
                        <input
                            type="text"
                            value={editingItem.id}
                            readOnly
                            className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
                        />
                    </div>

                    {/* Nama Item */}
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            Nama Item <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onInputChange}
                            placeholder="Contoh: Kemeja, Bed Cover, dll"
                            className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC]"
                            required
                        />
                    </div>

                    {/* Kategori dan Unit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">
                                Kategori <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={onInputChange}
                                className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#137FEC]"
                                required
                            >
                                {ITEM_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">
                                Unit <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={onInputChange}
                                className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#137FEC]"
                                required
                            >
                                {ITEM_UNITS.map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Harga dan Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">
                                Harga / Unit <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={onInputChange}
                                    placeholder="0"
                                    min="0"
                                    className="w-full bg-[#131C25] border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={onInputChange}
                                className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#137FEC]"
                                required
                            >
                                {ITEM_STATUSES.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex gap-4 pt-4 border-t border-gray-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-700 rounded-xl font-bold text-gray-300 hover:bg-gray-800 transition-all"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-[#137FEC] hover:bg-blue-600 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-500/20"
                        >
                            Update Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditItemModal;
