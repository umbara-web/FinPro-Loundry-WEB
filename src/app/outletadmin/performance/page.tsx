'use client';

import { Download } from 'lucide-react';
import { usePerformanceReport } from '@/app/admin/reports/performance/usePerformanceReport';
import { ReportFilter } from '@/app/admin/reports/ReportFilter';
import { PerformanceTable } from '@/app/admin/reports/performance/PerformanceTable';
import { EmployeeChart } from '@/app/admin/reports/performance/EmployeeChart';

export default function OutletPerformanceReport() {
    const {
        period,
        setPeriod,
        date,
        setDate,
        selectedOutlet,
        setSelectedOutlet,
        performanceData,
        topPerformers
    } = usePerformanceReport('1'); // Locked to outlet 1

    return (
        <div className="p-8 bg-[#121212] min-h-screen text-white font-sans">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <nav className="text-xs text-gray-500 mb-2">Dashboard / <span className="text-gray-300">Performance</span></nav>
                    <h1 className="text-3xl font-bold text-white mb-1">Team Performance</h1>
                    <p className="text-gray-500 text-sm">Monitor your outlet's team efficiency and tasks.</p>
                </div>
                <button className="bg-[#1E1E1E] border border-gray-800 hover:bg-[#252525] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all hover:cursor-pointer">
                    <Download size={18} /> Export Data
                </button>
            </div>

            <ReportFilter
                period={period}
                onPeriodChange={setPeriod}
                selectedOutlet={selectedOutlet}
                onOutletChange={setSelectedOutlet}
                // No outlets passed = selector hidden
                date={date}
                onDateChange={setDate}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <PerformanceTable data={performanceData} />
                </div>
                <div>
                    <EmployeeChart data={topPerformers} />
                </div>
            </div>
        </div>
    );
}
