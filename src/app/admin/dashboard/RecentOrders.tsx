import React from 'react';

interface OrderRowProps {
    id: string;
    name: string;
    service: string;
    status: string;
    total: string;
    statusColor: string;
}

const OrderRow: React.FC<OrderRowProps> = ({ id, name, service, status, total, statusColor }) => {
    return (
        <tr className="hover:bg-gray-800/20 transition">
            <td className="py-4 font-bold text-xs">{id}</td>
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${name}`} alt="user" />
                    </div>
                    <span className="font-medium text-xs">{name}</span>
                </div>
            </td>
            <td className="py-4 text-xs text-gray-400">{service}</td>
            <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColor}`}>{status}</span>
            </td>
            <td className="py-4 text-xs font-bold">{total}</td>
        </tr>
    );
};

export const RecentOrders: React.FC = () => {
    return (
        <div className="lg:col-span-2 bg-[#1C252E] rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Pesanan Terbaru</h3>
                <button className="text-blue-500 text-sm font-medium hover:cursor-pointer">Lihat Semua</button>
            </div>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-gray-500 border-b border-gray-800">
                        <th className="pb-4 font-medium text-left">ID PESANAN</th>
                        <th className="pb-4 font-medium text-left">PELANGGAN</th>
                        <th className="pb-4 font-medium text-left">LAYANAN</th>
                        <th className="pb-4 font-medium text-left">STATUS</th>
                        <th className="pb-4 font-medium text-left">TOTAL</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    <OrderRow id="#ORD-2451" name="Siti Aminah" service="Cuci Kering" status="Proses" total="Rp 45.000" statusColor="text-orange-400 bg-orange-400/10" />
                    <OrderRow id="#ORD-2450" name="Rudi Hartono" service="Setrika Saja" status="Selesai" total="Rp 20.000" statusColor="text-green-400 bg-green-400/10" />
                    <OrderRow id="#ORD-2449" name="Dewi Sartika" service="Cuci Komplit" status="Dijemput" total="Rp 75.000" statusColor="text-blue-400 bg-blue-400/10" />
                </tbody>
            </table>
        </div>
    );
};
