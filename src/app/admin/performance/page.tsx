'use client';

import { Download } from 'lucide-react';
import { usePerformanceReport } from '@/src/app/admin/reports/performance/usePerformanceReport';
import { ReportFilter } from '@/src/app/admin/reports/ReportFilter';
import { PerformanceTable } from '@/src/app/admin/reports/performance/PerformanceTable';
import { EmployeeChart } from '@/src/app/admin/reports/performance/EmployeeChart';

export default function AdminPerformanceReport() {
    const {
        period,
        setPeriod,
        date,
        setDate,
        selectedOutlet,
        setSelectedOutlet,
        outlets,
        performanceData,
        topPerformers
    } = usePerformanceReport('all');

    return (
        <div className="p-8 pb-12">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <nav className="text-xs text-slate-500 mb-2">Admin / <span className="text-slate-300">Performance</span></nav>
                    <h1 className="text-3xl font-bold mb-1">Employee Performance</h1>
                    <p className="text-slate-400 text-sm">Track jobs, ratings, and efficiency of your team.</p>
                </div>
                <button className="bg-[#1C252E] border border-gray-800 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all hover:cursor-pointer">
                    <Download size={18} /> Export Data
                </button>
            </div>

            <ReportFilter
                period={period}
                onPeriodChange={setPeriod}
                selectedOutlet={selectedOutlet}
                onOutletChange={setSelectedOutlet}
                outlets={outlets}
                date={date}
                onDateChange={setDate}
            />

            <div className="space-y-8">
                <div className="min-w-0">
                    <PerformanceTable data={performanceData} />
                </div>
                <div className="min-w-0">
                    <EmployeeChart data={topPerformers} />
                </div>
            </div>
        </div>
    );
}

