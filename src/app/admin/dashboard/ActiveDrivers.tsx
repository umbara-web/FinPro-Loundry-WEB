import React from 'react';
import { Truck } from 'lucide-react';

export const ActiveDrivers: React.FC = () => {
    return (
        <div className="bg-[#1C252E] rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Driver Aktif</h3>
                <Truck size={20} className="text-gray-500" />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-200 overflow-hidden relative">
                        <img src="https://i.pravatar.cc/150?u=driver1" alt="driver" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1C252E] rounded-full"></span>
                    </div>
                    <div>
                        <p className="text-sm font-bold">Ahmad Dani</p>
                        <p className="text-[11px] text-gray-500">Mengantar ke Tebet</p>
                    </div>
                </div>
                <span className="text-[11px] text-gray-500">5m lalu</span>
            </div>
        </div>
    );
};
