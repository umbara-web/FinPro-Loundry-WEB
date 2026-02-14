import React from 'react';
import { Address } from '@/app/admin/orders/types';

interface EditLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    addresses: Address[];
    selectedAddressId: string | null;
    onSelectAddress: (id: string) => void;

}

export const EditLocationModal: React.FC<EditLocationModalProps> = ({
    isOpen,
    onClose,
    addresses,
    selectedAddressId,
    onSelectAddress,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 max-w-sm w-full p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Ubah Lokasi Penjemputan</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            onClick={() => {
                                onSelectAddress(addr.id);
                                onClose();
                            }}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition ${selectedAddressId === addr.id
                                ? 'border-[#4FD1C5] bg-[#1a2e2c]'
                                : 'border-gray-800 hover:border-gray-600'
                                }`}
                        >
                            <p className="font-bold text-sm">{addr.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{addr.address}, {addr.city}</p>
                            <p className="text-xs text-gray-500 mt-1">{addr.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
