'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProsesOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (orderId: string, status: string) => void;
    orderIds: { id: string; rawId: string }[];
}

const STATUS_OPTIONS = [
    { value: 'WAITING_DRIVER', label: 'Waiting Driver' },
    { value: 'DRIVER_ASSIGNED', label: 'Driver Assigned' },
    { value: 'PICKED_UP', label: 'Picked Up' },
    { value: 'ARRIVED_OUTLET', label: 'Arrived Outlet' },
    { value: 'CANCELLED', label: 'Cancelled' },
];

export default function ProsesOrderModal({ isOpen, onClose, onSubmit, orderIds }: ProsesOrderModalProps) {
    const router = useRouter();
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedOrderId || !selectedStatus) return;
        // Navigate to the proses-order detail page with orderId and status as query params
        router.push(`/outletadmin/proses-order?orderId=${selectedOrderId}&status=${selectedStatus}`);
        onClose();
        setSelectedOrderId('');
        setSelectedStatus('');
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-800">
                    <h2 className="text-lg font-bold text-white">Proses Order</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-5">
                    {/* Order ID */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Order ID
                        </label>
                        <select
                            value={selectedOrderId}
                            onChange={(e) => setSelectedOrderId(e.target.value)}
                            className="w-full bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4FD1C5] transition-colors cursor-pointer"
                            required
                        >
                            <option value="">Pilih Order ID</option>
                            {orderIds.map((order) => (
                                <option key={order.rawId} value={order.rawId}>
                                    {order.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Status
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4FD1C5] transition-colors cursor-pointer"
                            required
                        >
                            <option value="">Pilih Status</option>
                            {STATUS_OPTIONS.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-700 rounded-xl text-sm font-semibold text-gray-300 hover:bg-gray-800 transition-all"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-[#4FD1C5] hover:bg-[#3fb9ae] rounded-xl text-sm font-bold text-[#121212] transition-all shadow-lg shadow-teal-500/10"
                        >
                            Proses
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
