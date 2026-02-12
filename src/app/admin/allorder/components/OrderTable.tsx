import React from 'react';
import { Order } from '../types';

interface OrderTableProps {
    orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-800/50 text-slate-400 text-sm uppercase">
                    <tr>
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4">Kostumer</th>
                        <th className="p-4">Outlet</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Jumlah</th>
                        <th className="p-4">Tanggal</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {orders.map((order, index) => (
                        <tr key={order.id || index} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-teal-400 font-medium">{order.id}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-slate-700 rounded-full" />
                                    <div>
                                        <p className="text-sm font-bold">{order.customer}</p>
                                        <p className="text-xs text-slate-500">{order.type}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-sm text-slate-300">{order.outlet}</td>
                            <td className="p-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Selesai' // Changed slightly based on logic in original file (Completed vs Selesai?)
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-orange-500/20 text-orange-400'
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-4 font-bold">{order.amount}</td>
                            <td className="p-4 text-sm text-slate-400">{order.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
