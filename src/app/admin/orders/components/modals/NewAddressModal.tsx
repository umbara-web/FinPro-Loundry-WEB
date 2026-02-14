import React from 'react';
import { MapPin } from 'lucide-react';
import { Address } from '@/app/admin/orders/types';
import { AddressForm } from '@/app/admin/orders/components/AddressForm';

interface NewAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (address: Address) => void;
}

export const NewAddressModal: React.FC<NewAddressModalProps> = ({ isOpen, onClose, onSuccess }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-8 py-4 border-b border-gray-800 sticky top-0 bg-[#1E1E1E]">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#4FD1C5] rounded-lg flex items-center justify-center">
                            <MapPin size={18} className="text-black" />
                        </div>
                        <span className="text-lg font-bold">Tambah Alamat Baru</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-8">
                    <AddressForm
                        onSuccess={onSuccess}
                        onClose={onClose}
                    />
                </div>
            </div>
        </div>
    );
};
