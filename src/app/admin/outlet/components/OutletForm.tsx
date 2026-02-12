import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { OutletFormData, OUTLET_STATUS_OPTIONS } from '../types';

interface OutletFormProps {
    initialData?: OutletFormData;
    onSubmit: (data: OutletFormData) => void;
    isLoading?: boolean;
    isEdit?: boolean;
    onCancel: () => void;
}

export const OutletForm: React.FC<OutletFormProps> = ({
    initialData,
    onSubmit,
    isLoading = false,
    isEdit = false,
    onCancel
}) => {
    // Default empty state
    const defaultState: OutletFormData = {
        name: '',
        address: '',
        city: '',
        manager: '',
        phone: '',
        openTime: '',
        status: 'ACTIVE'
    };

    const [formData, setFormData] = useState<OutletFormData>(defaultState);

    // Load initial data if provided
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seksi Info Dasar */}
            <div>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 pb-2 border-b border-gray-800">
                    <MapPin size={18} className="text-[#137FEC]" />
                    Informasi Outlet
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            Nama Outlet <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Contoh: Laundry Pusat - Jakarta"
                            className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC] transition-colors"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            Alamat Lengkap <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Contoh: Jl. Sudirman No. 45, Jakarta Selatan"
                            rows={3}
                            className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC] resize-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            Kota <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Contoh: Jakarta"
                            className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC] transition-colors"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Seksi Kontak & Operasional */}
            <div>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 pb-2 border-b border-gray-800">
                    <Phone size={18} className="text-[#137FEC]" />
                    Kontak & Operasional
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            Nama Manajer <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="manager"
                            value={formData.manager}
                            onChange={handleChange}
                            placeholder="Contoh: Budi Santoso"
                            className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC] transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            Nomor Telepon <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Contoh: 0812-3456-7890"
                            className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC] transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            Jam Operasional <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                name="openTime"
                                value={formData.openTime}
                                onChange={handleChange}
                                placeholder="08:00 - 21:00"
                                className="w-full bg-[#131C25] border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#137FEC] transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">
                            Status Outlet <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full bg-[#131C25] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#137FEC] transition-colors appearance-none"
                            required
                        >
                            {OUTLET_STATUS_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 border border-gray-700 rounded-xl font-bold text-gray-300 hover:bg-gray-800 transition-all"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-[#137FEC] hover:bg-blue-600 disabled:bg-blue-800 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-500/20"
                >
                    {isLoading ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Simpan Outlet')}
                </button>
            </div>
        </form>
    );
};
