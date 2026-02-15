import React from 'react';
import { EmployeePerformance } from './types';
import { Store } from 'lucide-react';

interface PerformanceTableProps {
    data: EmployeePerformance[];
}

export const PerformanceTable: React.FC<PerformanceTableProps> = ({ data }) => {
    return (
        <div className="bg-[#1C252E] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white">Employee Performance Details</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                <thead className="bg-[#233648]/30 text-gray-500 uppercase text-[10px] tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Employee</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Total Jobs</th>
                        <th className="px-6 py-4">Cabang</th>
                        <th className="px-6 py-4">On-Time</th>
                        <th className="px-6 py-4">Attendance</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {data.map((emp) => (
                        <tr key={emp.id} className="hover:bg-gray-800/20 transition-colors pointer-events-none">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full bg-gray-700" />
                                    <span className="font-medium text-white">{emp.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-[10px] border ${emp.role === 'Driver' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                    emp.role === 'Pekerja' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                    }`}>
                                    {emp.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-white">{emp.jobsCompleted}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Store size={14} className="text-gray-500" />
                                    <span className="text-xs font-medium">{emp.outlet}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-16 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${emp.onTimeRate > 90 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${emp.onTimeRate}%` }}></div>
                                    </div>
                                    <span className="text-xs text-gray-400">{emp.onTimeRate}%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">{emp.attendance}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};
