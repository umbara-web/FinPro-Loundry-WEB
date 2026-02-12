import React from 'react';
import { SERVICES } from '../../constants';

interface EditServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedService: string;
    onServiceChange: (service: string) => void;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
    isOpen,
    onClose,
    selectedService,
    onServiceChange,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 max-w-sm w-full p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Ubah Detail Layanan</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <div className="space-y-3">
                    {SERVICES.map((service) => (
                        <div
                            key={service.name}
                            onClick={() => {
                                onServiceChange(service.name);
                                onClose();
                            }}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition ${selectedService === service.name
                                ? 'border-[#4FD1C5] bg-[#1a2e2c]'
                                : 'border-gray-800 hover:border-gray-600'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                {/* Ideally map string icon name to actual component or emoji here too if needed, but for now reuse simple logic or just Emoji */}
                                <span className="text-xl">
                                    {service.icon === 'package' ? '📦' : service.icon === 'shirt' ? '👕' : '👔'}
                                </span>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{service.name}</p>
                                    <p className="text-xs text-gray-400 mt-1">{service.desc}</p>
                                    <p className="text-xs text-gray-500 mt-2 font-semibold">{service.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
