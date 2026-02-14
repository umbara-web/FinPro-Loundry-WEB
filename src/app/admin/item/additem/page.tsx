'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SidebarDashboard from '@/app/admin/allorder/components/mainsidebar';
import { useAddItem } from './hooks/useAddItem';

function AddItemPage() {
    const { formData, handleInputChange, handleAddItem } = useAddItem();

    return (
        <div className="flex min-h-screen bg-[#101922] font-sans text-white">
            <SidebarDashboard />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="text-xs text-gray-500 mb-2">
                        <Link href="/" className="hover:cursor-pointer">Dashboard /</Link>
                        <Link href="/admin/item" className="hover:cursor-pointer">Kelola Item Laundry /</Link>
                        <span className="text-white">Tambah Item Baru</span>
                    </div>

                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight">Tambah Item Baru</h1>
                            <p className="text-[#92ADC9] mt-1">Tambahkan item laundry baru ke dalam sistem</p>
                        </div>
                        <Link href="/admin/item">
                            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all">
                                <ArrowLeft size={20} strokeWidth={3} />
                                Kembali
                            </button>
                        </Link>
                    </div>

                    <div className="bg-[#1C252E] rounded-2xl border border-gray-800 p-8">
                        <form onSubmit={handleAddItem} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">
                                    Nama Item <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: Kemeja, Bed Cover, dll"
                                    className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC]"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#137FEC]"
                                        required
                                    >
                                        <option value="Cuci Setrika">Cuci Setrika</option>
                                        <option value="Satuan">Satuan</option>
                                        <option value="Dry Clean">Dry Clean</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">
                                        Unit <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#137FEC]"
                                        required
                                    >
                                        <option value="kg">kg</option>
                                        <option value="pcs">pcs</option>
                                        <option value="m²">m²</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">
                                        Harga / Unit <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
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
                                        onChange={handleInputChange}
                                        className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#137FEC]"
                                        required
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Non-Aktif">Non-Aktif</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-gray-800">
                                <Link href="/admin/item" className="flex-1">
                                    <button
                                        type="button"
                                        className="w-full px-6 py-3 border border-gray-700 rounded-xl font-bold text-gray-300 hover:bg-gray-800 transition-all"
                                    >
                                        Batal
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-[#137FEC] hover:bg-blue-600 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-500/20"
                                >
                                    Simpan Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddItemPage;