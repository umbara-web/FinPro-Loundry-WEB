'use client';

import SidebarDashboard from '@/app/components/mainsidebar';
import { Download } from 'lucide-react';
import { usePerformanceReport } from '@/app/components/reports/performance/usePerformanceReport';
import { ReportFilter } from '@/app/components/reports/ReportFilter';
import { PerformanceTable } from '@/app/components/reports/performance/PerformanceTable';
import { EmployeeChart } from '@/app/components/reports/performance/EmployeeChart';

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
        <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
            <SidebarDashboard />

            <main className="flex-1 p-8 overflow-y-auto">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <PerformanceTable data={performanceData} />
                    </div>
                    <div>
                        <EmployeeChart data={topPerformers} />
                    </div>
                </div>
            </main>
        </div>
    );
}
