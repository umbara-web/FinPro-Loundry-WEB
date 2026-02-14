import { MapPin, Check } from 'lucide-react';
import { Address } from '@/app/admin/orders/types';

interface PickupLocationProps {
    addresses: Address[];
    loading: boolean;
    error: string;
    selectedAddressId: string | null;
    onSelectAddress: (id: string) => void;
    onDeleteAddress: (id: string) => void;
    onAddAddressClick: () => void;
}

export const PickupLocation: React.FC<PickupLocationProps> = ({
    addresses,
    loading,
    error,
    selectedAddressId,
    onSelectAddress,
    onDeleteAddress,
    onAddAddressClick,
}) => {
    return (
        <section>
            <h2 className="flex items-center gap-3 text-lg font-semibold mb-5">
                <span className="bg-[#1a2e2c] text-[#4FD1C5] p-2 rounded-lg">
                    <MapPin size={18} />
                </span>
                1. Lokasi Penjemputan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading && (
                    <div className="bg-[#1E1E1E] p-5 rounded-2xl border border-gray-800 text-sm text-gray-400">
                        Memuat lokasi penjemputan...
                    </div>
                )}

                {!loading && error && (
                    <div className="bg-[#1E1E1E] p-5 rounded-2xl border border-red-500/30 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    addresses.map((a) => {
                        const isSelected = selectedAddressId === a.id;
                        return (
                            <div
                                key={a.id}
                                onClick={() => onSelectAddress(a.id)}
                                className={`bg-[#1E1E1E] p-5 rounded-2xl border-2 relative group cursor-pointer transition ${isSelected
                                    ? 'border-[#4FD1C5]'
                                    : 'border-gray-800 hover:border-gray-600'
                                    }`}
                            >
                                <span className="text-[10px] bg-[#1a2e2c] text-[#4FD1C5] px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
                                    {a.city}
                                </span>
                                <h3 className="font-bold mt-3">{a.name}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed mt-1">
                                    {a.address}, {a.city}, {a.postalCode}
                                </p>
                                <p className="text-sm text-gray-500 mt-2 font-mono">
                                    {a.phone}
                                </p>

                                {/* Delete button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteAddress(a.id);
                                    }}
                                    title="Hapus alamat"
                                    className="absolute top-3 right-3 text-red-400 hover:text-red-300 bg-transparent p-1 rounded-md"
                                >
                                    ✕
                                </button>

                                {isSelected && (
                                    <div className="absolute top-5 right-10 w-5 h-5 bg-[#4FD1C5] rounded-full flex items-center justify-center">
                                        <Check size={12} className="text-black stroke-3" />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                <button
                    onClick={onAddAddressClick}
                    className="bg-[#1E1E1E] p-5 rounded-2xl border border-gray-800 opacity-50 hover:opacity-100 transition cursor-pointer flex flex-col justify-center items-center border-dashed w-full"
                >
                    <span className="text-2xl mb-1">+</span>
                    <span className="text-xs font-medium text-gray-400">
                        Tambah Alamat Baru
                    </span>
                </button>
            </div>
        </section>
    );
};
