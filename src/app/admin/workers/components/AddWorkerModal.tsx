import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { WorkerFormData, WORKER_ROLES, WORKER_STATUSES } from '../types';
import { Outlet } from '../../outlet/types';

interface AddWorkerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: WorkerFormData) => void;
    initialData?: WorkerFormData;
    isEdit?: boolean;
    outlets?: Outlet[];
}

export const AddWorkerModal: React.FC<AddWorkerModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEdit = false,
    outlets = []
}) => {
    const defaultData: WorkerFormData = {
        name: '',
        email: '',
        phone: '',
        role: 'Pekerja',
        outlet: '',
        status: 'Active'
    };

    const [formData, setFormData] = useState<WorkerFormData>(defaultData);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || defaultData);
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e293b] rounded-2xl border border-slate-700 w-full max-w-lg shadow-xl">
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">
                        {isEdit ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Nomor Telepon</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                            >
                                {WORKER_ROLES.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                            >
                                {WORKER_STATUSES.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Outlet Penempatan</label>
                        {outlets && outlets.length > 0 ? (
                            <select
                                name="outlet"
                                value={formData.outlet}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                                required
                            >
                                <option value="">Pilih Outlet</option>
                                {outlets.map(outlet => (
                                    <option key={outlet.id} value={outlet.name}>{outlet.name}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                name="outlet"
                                value={formData.outlet}
                                onChange={handleChange}
                                placeholder="Contoh: Cabang Jakarta Selatan"
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                                required
                            />
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
