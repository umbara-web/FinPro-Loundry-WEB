import React from 'react';
import { X } from 'lucide-react';
import { OutletForm } from './OutletForm';
import { OutletFormData } from '@/app/admin/outlet/types';

interface EditOutletModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: OutletFormData;
    onSubmit: (data: OutletFormData) => void;
    isLoading: boolean;
}

export const EditOutletModal: React.FC<EditOutletModalProps> = ({
    isOpen,
    onClose,
    initialData,
    onSubmit,
    isLoading
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1C252E] rounded-2xl border border-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white">Edit Outlet</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <OutletForm
                        initialData={initialData}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        isEdit={true}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </div>
    );
};
