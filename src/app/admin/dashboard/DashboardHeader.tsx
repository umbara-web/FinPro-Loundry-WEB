import React from 'react';
import { Download } from 'lucide-react';

interface DashboardHeaderProps {
    connectionStatus: 'checking' | 'connected' | 'error';
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ connectionStatus }) => {
    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-3xl font-bold">Selamat Datang, Admin</h1>
                <p className="text-gray-400 mt-1">Ringkasan operasional dan kesehatan bisnis hari ini.</p>

                {/* Connection Status Indicator */}
                <div className={`mt-2 flex items-center gap-2 text-sm ${connectionStatus === 'connected' ? 'text-green-500' :
                    connectionStatus === 'error' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                    <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' :
                        connectionStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                    {connectionStatus === 'connected' ? 'Backend Connected' :
                        connectionStatus === 'error' ? 'Backend Disconnected' : 'Checking Connection...'}
                </div>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-[#1C252E] border border-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition hover:cursor-pointer">
                    <Download size={18} /> Unduh Laporan
                </button>
            </div>
        </div>
    );
};
