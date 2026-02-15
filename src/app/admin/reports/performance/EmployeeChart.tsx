import React from 'react';
import { EmployeePerformance } from './types';

interface EmployeeChartProps {
    data: EmployeePerformance[];
}

export const EmployeeChart: React.FC<EmployeeChartProps> = ({ data }) => {
    const maxJobs = Math.max(...data.map(d => d.jobsCompleted), 1);

    return (
        <div className="bg-[#1C252E] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Top Performing Employees (Jobs Completed)</h3>

            <div className="space-y-4">
                {data.map((emp) => (
                    <div key={emp.id} className="group">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300 font-medium">{emp.name} <span className="text-gray-500 text-xs">({emp.role})</span></span>
                            <span className="text-white font-bold">{emp.jobsCompleted} Jobs</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#4FD1C5] rounded-full transition-all duration-500 relative group-hover:bg-[#20bd9d]"
                                style={{ width: `${(emp.jobsCompleted / maxJobs) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
