
import { Eye, Pencil, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { Order } from "@/src/app/outletadmin/types";

interface OrderTableProps {
    orders: Order[];
    totalOrders: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    itemsPerPage: number;
    onEdit: (order: Order) => void;
}

export default function OrderTable({
    orders,
    totalOrders,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    onEdit
}: OrderTableProps) {
    return (
        <div className="w-full">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#252525] text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Service</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Assigned To</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {orders.map((order, i) => (
                        <tr key={i} className="hover:bg-[#252525]/50 transition-colors text-xs">
                            <td className="px-6 py-4">
                                <p className="font-bold text-white">{order.id}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">{order.date}</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-900/30 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                                        {order.customer.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-gray-200 font-medium">{order.customer}</p>
                                        <p className="text-[10px] text-gray-500">{order.phone}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                                {order.service} <br />
                                <span className="text-gray-500 text-[10px]">{order.items}</span> <br />
                                <span className="text-gray-500 text-[10px]">{order.quantity} pcs • {order.weight} kg</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full border text-[10px] font-semibold 
                  ${order.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                            'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                                    ● {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-400 italic">
                                {order.assigned || "Unassigned"}
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-white font-medium">{order.total}</p>
                                <p className={`text-[10px] font-bold ${order.paid ? 'text-green-500' : 'text-gray-500'}`}>
                                    {order.paid ? 'Paid' : 'Unpaid'}
                                </p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3 text-gray-500">
                                    <Pencil
                                        size={16}
                                        className="cursor-pointer hover:text-white"
                                        onClick={() => onEdit(order)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-8 text-gray-500">No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="p-5 flex justify-between items-center text-[11px] text-gray-500 border-t border-gray-800">
                <p>Showing <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalOrders)}</span> of <span className="text-white">{totalOrders}</span> orders</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 border border-gray-800 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-[#4FD1C5] text-black font-bold' : 'border border-gray-800 hover:bg-gray-800'}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 border border-gray-800 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}