import { ChevronRight, Headset } from 'lucide-react';
import { Address } from '@/app/admin/orders/types';

interface SummaryItemProps {
    label: string;
    value: string;
    subValue: string;
    onEdit?: () => void;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
    label,
    value,
    subValue,
    onEdit,
}) => {
    return (
        <div className="flex justify-between items-start group">
            <div className="flex gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-[#4FD1C5]"></div>
                <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold">{label}</p>
                    <p className="text-white font-bold text-sm mt-1">{value}</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">{subValue}</p>
                </div>
            </div>
            <button
                onClick={onEdit}
                className="text-[#4FD1C5] text-[10px] font-bold uppercase tracking-wider hover:underline"
            >
                Ubah
            </button>
        </div>
    );
};

interface OrderSummaryProps {
    selectedAddress: Address | null;
    selectedDate: string;
    selectedTime: string;
    selectedService: string;
    onEditLocation: () => void;
    onEditSchedule: () => void;
    onEditService: () => void;
    onConfirm: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    selectedAddress,
    selectedDate,
    selectedTime,
    selectedService,
    onEditLocation,
    onEditSchedule,
    onEditService,
    onConfirm,
}) => {
    return (
        <div className="space-y-4">
            <div className="bg-[#1E1E1E] p-6 rounded-3xl border border-gray-800 sticky top-10 shadow-2xl">
                <h3 className="flex items-center gap-2 font-bold text-lg mb-6 border-b border-gray-800 pb-4">
                    <span>📋</span> Ringkasan Pesanan
                </h3>

                <div className="space-y-6">
                    <SummaryItem
                        label="Lokasi Penjemputan"
                        value={selectedAddress ? selectedAddress.name : 'Belum dipilih'}
                        subValue={
                            selectedAddress
                                ? `${selectedAddress.address}, ${selectedAddress.city}`
                                : 'Pilih lokasi penjemputan'
                        }
                        onEdit={onEditLocation}
                    />
                    <SummaryItem
                        label="Jadwal Penjemputan"
                        value={new Date(selectedDate).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        subValue={`${selectedTime} WIB`}
                        onEdit={onEditSchedule}
                    />
                    <SummaryItem
                        label="Detail Layanan"
                        value={selectedService}
                        subValue="Regular Service"
                        onEdit={onEditService}
                    />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                    <div className="bg-[#1a2e2c] p-3 rounded-xl mb-6 flex gap-3 items-start">
                        <div className="w-2 h-2 bg-[#4FD1C5] rounded-full mt-1.5 shrink-0"></div>
                        <p className="text-[10px] text-gray-300 leading-relaxed">
                            Total harga akan dihitung setelah laundry ditimbang oleh petugas
                            kami saat penjemputan.
                        </p>
                    </div>
                    <button
                        onClick={onConfirm}
                        className="w-full bg-[#4FD1C5] text-black font-black py-4 rounded-2xl hover:bg-[#3db8ae] transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 group"
                    >
                        Konfirmasi Pesanan{' '}
                        <ChevronRight
                            size={18}
                            className="group-hover:translate-x-1 transition"
                        />
                    </button>
                </div>
            </div>

            <div className="bg-[#1E1E1E] p-5 rounded-2xl border border-gray-800 flex items-center gap-4 hover:border-gray-600 transition cursor-pointer">
                <div className="bg-gray-800 p-3 rounded-xl text-[#4FD1C5]">
                    <Headset size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold">Butuh Bantuan?</p>
                    <p className="text-[11px] text-gray-500">Hubungi CS kami 24/7</p>
                </div>
            </div>
        </div>
    );
};
