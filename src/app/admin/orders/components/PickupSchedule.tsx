import { Calendar } from 'lucide-react';
import { TIME_SLOTS } from '@/app/admin/orders/constants';

interface PickupScheduleProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedTime: string;
    setSelectedTime: (time: string) => void;
}

export const PickupSchedule: React.FC<PickupScheduleProps> = ({
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
}) => {
    return (
        <section>
            <h2 className="flex items-center gap-3 text-lg font-semibold mb-5">
                <span className="bg-[#1a2e2c] text-[#4FD1C5] p-2 rounded-lg">
                    <Calendar size={18} />
                </span>
                2. Jadwal Penjemputan
            </h2>
            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">
                        Tanggal
                    </label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-[#121212] border border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:border-[#4FD1C5]"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">
                        Waktu (Slot Tersedia)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {TIME_SLOTS.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2.5 rounded-xl text-[11px] font-bold transition ${selectedTime === time
                                    ? 'bg-[#4FD1C5] text-black'
                                    : 'bg-[#121212] border border-gray-800 text-gray-300 hover:bg-gray-800 hover:cursor-pointer'
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
