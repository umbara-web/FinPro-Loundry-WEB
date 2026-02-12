import React from 'react';

interface ProgressBarProps {
    label: string;
    value: string;
    color: string;
    percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, color, percent }) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs">
                <span className="text-gray-400">{label}</span>
                <span className="font-bold">{value}</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
};

export const OutletPerformance: React.FC = () => {
    return (
        <div className="bg-[#1C252E] rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold mb-6">Performa Outlet</h3>
            <div className="space-y-6">
                <ProgressBar label="Outlet Jakarta " value="Rp 12.5jt" color="bg-blue-500" percent={85} />
                <ProgressBar label="Outlet Bandung " value="Rp 9.2jt" color="bg-purple-500" percent={65} />
                <ProgressBar label="Outlet Surabaya " value="Rp 8.1jt" color="bg-orange-500" percent={55} />
            </div>
            <button className="w-full mt-8 py-2 border border-gray-800 rounded-lg text-sm text-gray-400 hover:bg-gray-800 transition hover:cursor-pointer">
                Lihat Semua Outlet
            </button>
        </div>
    );
};
