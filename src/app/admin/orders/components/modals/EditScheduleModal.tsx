import React from 'react';
import { TIME_SLOTS } from '@/app/admin/orders/constants';

interface EditScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: string;
    onDateChange: (date: string) => void;
    selectedTime: string;
    onTimeChange: (time: string) => void;
}

export const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
    isOpen,
    onClose,
    selectedDate,
    onDateChange,
    selectedTime,
    onTimeChange,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 max-w-sm w-full p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Ubah Jadwal Penjemputan</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Tanggal</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => onDateChange(e.target.value)}
                            className="w-full bg-[#121212] border border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:border-[#4FD1C5]"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Waktu</label>
                        <div className="grid grid-cols-2 gap-2">
                            {TIME_SLOTS.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => onTimeChange(time)}
                                    className={`py-2 rounded-xl text-[11px] font-bold transition ${selectedTime === time ? 'bg-[#4FD1C5] text-black' : 'bg-[#121212] border border-gray-800 text-gray-300 hover:bg-gray-800'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full bg-[#4FD1C5] text-black py-3 rounded-xl font-bold hover:bg-[#3FB5A8] transition mt-4"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};
