'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';
import {
  Package, Users, Store, TrendingUp, Truck,
  ShoppingBag, DollarSign, Clock, ArrowUpRight,
  ArrowDownRight, BarChart3, Activity, CheckCircle2,
  UserPlus, Download, Shirt, Eye
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────

const STATS = [
  { title: 'Total Pesanan', value: '1,248', sub: '+12.5%', icon: <ShoppingBag size={20} />, trend: 'up' as const, color: 'from-blue-500 to-blue-600' },
  { title: 'Pendapatan Bulan Ini', value: 'Rp 42.8jt', sub: '+8.2%', icon: <DollarSign size={20} />, trend: 'up' as const, color: 'from-emerald-500 to-emerald-600' },
  { title: 'Pelanggan Aktif', value: '356', sub: '+5.1%', icon: <Users size={20} />, trend: 'up' as const, color: 'from-purple-500 to-purple-600' },
  { title: 'Outlet Aktif', value: '8', sub: '2 baru', icon: <Store size={20} />, trend: 'up' as const, color: 'from-orange-500 to-orange-600' },
];

const RECENT_ORDERS = [
  { id: '#ORD-2451', name: 'Siti Aminah', service: 'Cuci Kering', status: 'Proses', total: 'Rp 45.000', statusColor: 'text-orange-400 bg-orange-500/10' },
  { id: '#ORD-2450', name: 'Rudi Hartono', service: 'Setrika Saja', status: 'Selesai', total: 'Rp 20.000', statusColor: 'text-green-400 bg-green-500/10' },
  { id: '#ORD-2449', name: 'Dewi Sartika', service: 'Cuci Komplit', status: 'Dijemput', total: 'Rp 75.000', statusColor: 'text-blue-400 bg-blue-500/10' },
  { id: '#ORD-2448', name: 'Budi Santoso', service: 'Express Wash', status: 'Menunggu', total: 'Rp 120.000', statusColor: 'text-yellow-400 bg-yellow-500/10' },
  { id: '#ORD-2447', name: 'Rina Melati', service: 'Dry Clean', status: 'Selesai', total: 'Rp 95.000', statusColor: 'text-green-400 bg-green-500/10' },
];

const OUTLET_PERF = [
  { name: 'Outlet Jakarta Selatan', revenue: 'Rp 12.5jt', percent: 85, color: 'bg-blue-500' },
  { name: 'Outlet Bandung', revenue: 'Rp 9.2jt', percent: 65, color: 'bg-purple-500' },
  { name: 'Outlet Surabaya', revenue: 'Rp 8.1jt', percent: 55, color: 'bg-orange-500' },
  { name: 'Outlet Yogyakarta', revenue: 'Rp 6.4jt', percent: 42, color: 'bg-teal-500' },
];

const ACTIVE_DRIVERS = [
  { name: 'Ahmad Dani', task: 'Mengantar ke Tebet', time: '5m lalu', avatar: 'driver1' },
  { name: 'Rahmat Hidayat', task: 'Menjemput di Kemang', time: '12m lalu', avatar: 'driver2' },
  { name: 'Sari Dewi', task: 'Mengantar ke Menteng', time: '18m lalu', avatar: 'driver3' },
];

const QUICK_ACTIONS = [
  { icon: <Store size={22} />, label: 'Kelola Outlet', href: '/admin/outlet', color: 'from-blue-500/20 to-blue-600/20', iconColor: 'text-blue-400' },
  { icon: <UserPlus size={22} />, label: 'Kelola Pengguna', href: '/admin/workers', color: 'from-emerald-500/20 to-emerald-600/20', iconColor: 'text-emerald-400' },
  { icon: <Shirt size={22} />, label: 'Item Laundry', href: '/admin/item', color: 'from-purple-500/20 to-purple-600/20', iconColor: 'text-purple-400' },
  { icon: <Truck size={22} />, label: 'Penempatan Staff', href: '/admin/assignstaff', color: 'from-orange-500/20 to-orange-600/20', iconColor: 'text-orange-400' },
  { icon: <BarChart3 size={22} />, label: 'Laporan Kinerja', href: '/admin/performance', color: 'from-rose-500/20 to-rose-600/20', iconColor: 'text-rose-400' },
];

// ─── Component ───────────────────────────────────────────────

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Admin';
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [currentTime, setCurrentTime] = useState('');
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    // Simulate connection check
    const timer = setTimeout(() => setConnectionStatus('connected'), 1200);
    // Animate stats on mount
    const animTimer = setTimeout(() => setAnimatedStats(true), 200);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => { clearTimeout(timer); clearTimeout(animTimer); clearInterval(interval); };
  }, []);

  return (
    <div className="p-6 lg:p-8 overflow-y-auto space-y-8">

      {/* ── HEADER ──────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div>
          <nav className="text-xs text-slate-500 mb-2">Admin / Dashboard</nav>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
            Selamat Datang, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{firstName}</span> 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">Ringkasan operasional dan kesehatan bisnis hari ini.</p>

          {/* Connection + Time */}
          <div className="flex items-center gap-4 mt-3">
            <div className={`flex items-center gap-2 text-xs ${connectionStatus === 'connected' ? 'text-green-400' :
              connectionStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
              }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${connectionStatus === 'connected' ? 'bg-green-400' :
                connectionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400'
                }`} />
              {connectionStatus === 'connected' ? 'Backend Connected' :
                connectionStatus === 'error' ? 'Disconnected' : 'Checking...'}
            </div>
            <span className="text-xs text-slate-600">|</span>
            <span className="text-xs text-slate-500">{currentTime}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#1C252E] border border-gray-800 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition hover:cursor-pointer">
            <Download size={16} /> Unduh Laporan
          </button>
        </div>
      </div>

      {/* ── STAT CARDS ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`relative bg-[#1C252E] rounded-2xl border border-gray-800 p-6 overflow-hidden group hover:border-gray-700 transition-all duration-500 ${animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-80`} />

            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 text-white group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </div>
            <h2 className="text-3xl font-black mb-2">{stat.value}</h2>
            <div className="flex items-center gap-1.5">
              {stat.trend === 'up' ? (
                <ArrowUpRight size={14} className="text-green-400" />
              ) : (
                <ArrowDownRight size={14} className="text-red-400" />
              )}
              <span className={`text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.sub}
              </span>
              <span className="text-[10px] text-gray-600 ml-1">vs bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── QUICK ACTIONS ──────────────────────────────── */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {QUICK_ACTIONS.map((action, i) => (
            <Link key={i} href={action.href}>
              <div className="flex flex-col items-center justify-center gap-3 p-5 bg-[#1C252E] rounded-2xl border border-gray-800 hover:border-gray-600 transition-all group cursor-pointer hover:shadow-lg hover:shadow-black/20">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} ${action.iconColor} group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors text-center">
                  {action.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Orders (2/3 width) */}
        <div className="lg:col-span-2 bg-[#1C252E] rounded-2xl border border-gray-800 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity size={18} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold">Pesanan Terbaru</h3>
            </div>
            <Link href="/admin/allorder" className="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center gap-1 transition-colors">
              Lihat Semua <Eye size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800/50">
                  <th className="px-6 py-3.5 font-semibold text-left text-xs uppercase tracking-wider">ID Pesanan</th>
                  <th className="px-6 py-3.5 font-semibold text-left text-xs uppercase tracking-wider">Pelanggan</th>
                  <th className="px-6 py-3.5 font-semibold text-left text-xs uppercase tracking-wider">Layanan</th>
                  <th className="px-6 py-3.5 font-semibold text-left text-xs uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 font-semibold text-left text-xs uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {RECENT_ORDERS.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-xs text-blue-400">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden ring-2 ring-gray-700">
                          <img src={`https://i.pravatar.cc/150?u=${order.name}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-xs">{order.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">{order.service}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* Outlet Performance */}
          <div className="bg-[#1C252E] rounded-2xl border border-gray-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <TrendingUp size={18} className="text-purple-400" />
                </div>
                <h3 className="font-bold">Performa Outlet</h3>
              </div>
            </div>
            <div className="space-y-5">
              {OUTLET_PERF.map((outlet, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{outlet.name}</span>
                    <span className="font-bold">{outlet.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`${outlet.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: animatedStats ? `${outlet.percent}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/outlet">
              <button className="w-full mt-6 py-2.5 border border-gray-800 rounded-xl text-xs text-gray-400 hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
                Lihat Semua Outlet →
              </button>
            </Link>
          </div>

          {/* Active Drivers */}
          <div className="bg-[#1C252E] rounded-2xl border border-gray-800 p-6">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Truck size={18} className="text-orange-400" />
                </div>
                <h3 className="font-bold">Driver Aktif</h3>
              </div>
              <span className="text-xs text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full font-bold">
                {ACTIVE_DRIVERS.length} Online
              </span>
            </div>
            <div className="space-y-4">
              {ACTIVE_DRIVERS.map((driver, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden relative ring-2 ring-gray-700">
                      <img src={`https://i.pravatar.cc/150?u=${driver.avatar}`} alt={driver.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1C252E] rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">{driver.name}</p>
                      <p className="text-[11px] text-gray-500">{driver.task}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-600">{driver.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER SUMMARY ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20 p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Clock size={22} className="text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-black">24</p>
            <p className="text-xs text-gray-400">Pesanan Dalam Proses</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl border border-emerald-500/20 p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <CheckCircle2 size={22} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-black">187</p>
            <p className="text-xs text-gray-400">Pesanan Selesai Minggu Ini</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl border border-purple-500/20 p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <TrendingUp size={22} className="text-purple-400" />
          </div>
          <div>
            <p className="text-2xl font-black">4.8★</p>
            <p className="text-xs text-gray-400">Rating Rata-Rata Outlet</p>
          </div>
        </div>
      </div>

    </div>
  );
}
