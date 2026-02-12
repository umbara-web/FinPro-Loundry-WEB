import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Order } from '@/app/outletadmin/types';

interface CreateOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (order: Omit<Order, 'id' | 'date' | 'status' | 'total' | 'paid'>) => void;
}

export default function CreateOrderModal({ isOpen, onClose, onSubmit }: CreateOrderModalProps) {
    const [formData, setFormData] = useState({
        customer: '',
        phone: '',
        service: '',
        items: '',
        quantity: '',
        weight: '',
        assigned: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            customer: formData.customer,
            phone: formData.phone,
            service: formData.service,
            items: formData.items,
            quantity: Number(formData.quantity) || 0,
            weight: Number(formData.weight) || 0,
            assigned: formData.assigned || null
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">Create New Order</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Customer Name</label>
                        <input
                            type="text"
                            name="customer"
                            value={formData.customer}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                            placeholder="e.g. Budi Santoso"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                            placeholder="e.g. 0812-3456-7890"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Service Type</label>
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none"
                            required
                        >
                            <option value="">Select Service</option>
                            <option value="Wash & Fold">Wash & Fold</option>
                            <option value="Dry Clean">Dry Clean</option>
                            <option value="Ironing Only">Ironing Only</option>
                            <option value="Shoe Cleaning">Shoe Cleaning</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Item Name / Description</label>
                        <input
                            type="text"
                            name="items"
                            value={formData.items}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                            placeholder="e.g. Mixed Clothes, Suits, etc."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Quantity (pcs)</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full bg-[#121212] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                placeholder="e.g. 5"
                                required
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Total Weight (Kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full bg-[#121212] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                placeholder="e.g. 3.5"
                                required
                                step="0.1"
                                min="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">Assign To (Optional)</label>
                        <select
                            name="assigned"
                            value={formData.assigned}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none"
                        >
                            <option value="">Unassigned</option>
                            <option value="Siti A.">Siti A.</option>
                            <option value="Rudi H.">Rudi H.</option>
                            <option value="Dewi S.">Dewi S.</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-700 rounded-xl text-gray-300 font-bold hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-[#4FD1C5] hover:bg-[#3fb9ae] text-black font-bold rounded-xl transition-colors shadow-lg shadow-teal-500/20"
                        >
                            Create Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
