'use client';

import { Download } from 'lucide-react';
import { useSalesReport } from '@/app/admin/reports/useSalesReport';
import { ReportFilter } from '@/app/admin/reports/ReportFilter';
import { SummaryCards } from '@/app/admin/reports/SummaryCards';
import { IncomeChart } from '@/app/admin/reports/IncomeChart';

export default function OutletReports() {
  const {
    period,
    setPeriod,
    date,
    setDate,
    selectedOutlet,
    setSelectedOutlet,
    chartData,
    stats
  } = useSalesReport('1');

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white font-sans">
      <div className="flex justify-between items-start mb-8">
        <div>
          <nav className="text-xs text-gray-500 mb-2">Dashboard / <span className="text-gray-300">My Reports</span></nav>
          <h1 className="text-3xl font-bold text-white mb-1">My Outlet Income</h1>
          <p className="text-gray-500 text-sm">Track your daily, monthly, and yearly revenue.</p>
        </div>
        <button className="bg-[#1E1E1E] border border-gray-800 hover:bg-[#252525] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all hover:cursor-pointer">
          <Download size={18} /> Export Report
        </button>
      </div>

      <ReportFilter
        period={period}
        onPeriodChange={setPeriod}
        selectedOutlet={selectedOutlet}
        onOutletChange={setSelectedOutlet}

        date={date}
        onDateChange={setDate}
      />

      <SummaryCards stats={stats} />

      <IncomeChart data={chartData} period={period} />
    </div>
  );
}
