'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';
import {
  Package,
  Users,
  Store,
  TrendingUp,
  Truck,
  ShoppingBag,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  CheckCircle2,
  UserPlus,
  Download,
  Shirt,
  Eye,
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────

const STATS = [
  {
    title: 'Total Pesanan',
    value: '1,248',
    sub: '+12.5%',
    icon: <ShoppingBag size={20} />,
    trend: 'up' as const,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Pendapatan Bulan Ini',
    value: 'Rp 42.8jt',
    sub: '+8.2%',
    icon: <DollarSign size={20} />,
    trend: 'up' as const,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Pelanggan Aktif',
    value: '356',
    sub: '+5.1%',
    icon: <Users size={20} />,
    trend: 'up' as const,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Outlet Aktif',
    value: '8',
    sub: '2 baru',
    icon: <Store size={20} />,
    trend: 'up' as const,
    color: 'from-orange-500 to-orange-600',
  },
];

const RECENT_ORDERS = [
  {
    id: '#ORD-2451',
    name: 'Siti Aminah',
    service: 'Cuci Kering',
    status: 'Proses',
    total: 'Rp 45.000',
    statusColor: 'text-orange-400 bg-orange-500/10',
  },
  {
    id: '#ORD-2450',
    name: 'Rudi Hartono',
    service: 'Setrika Saja',
    status: 'Selesai',
    total: 'Rp 20.000',
    statusColor: 'text-green-400 bg-green-500/10',
  },
  {
    id: '#ORD-2449',
    name: 'Dewi Sartika',
    service: 'Cuci Komplit',
    status: 'Dijemput',
    total: 'Rp 75.000',
    statusColor: 'text-blue-400 bg-blue-500/10',
  },
  {
    id: '#ORD-2448',
    name: 'Budi Santoso',
    service: 'Express Wash',
    status: 'Menunggu',
    total: 'Rp 120.000',
    statusColor: 'text-yellow-400 bg-yellow-500/10',
  },
  {
    id: '#ORD-2447',
    name: 'Rina Melati',
    service: 'Dry Clean',
    status: 'Selesai',
    total: 'Rp 95.000',
    statusColor: 'text-green-400 bg-green-500/10',
  },
];

const OUTLET_PERF = [
  {
    name: 'Outlet Jakarta Selatan',
    revenue: 'Rp 12.5jt',
    percent: 85,
    color: 'bg-blue-500',
  },
  {
    name: 'Outlet Bandung',
    revenue: 'Rp 9.2jt',
    percent: 65,
    color: 'bg-purple-500',
  },
  {
    name: 'Outlet Surabaya',
    revenue: 'Rp 8.1jt',
    percent: 55,
    color: 'bg-orange-500',
  },
  {
    name: 'Outlet Yogyakarta',
    revenue: 'Rp 6.4jt',
    percent: 42,
    color: 'bg-teal-500',
  },
];

const ACTIVE_DRIVERS = [
  {
    name: 'Ahmad Dani',
    task: 'Mengantar ke Tebet',
    time: '5m lalu',
    avatar: 'driver1',
  },
  {
    name: 'Rahmat Hidayat',
    task: 'Menjemput di Kemang',
    time: '12m lalu',
    avatar: 'driver2',
  },
  {
    name: 'Sari Dewi',
    task: 'Mengantar ke Menteng',
    time: '18m lalu',
    avatar: 'driver3',
  },
];

const QUICK_ACTIONS = [
  {
    icon: <Store size={22} />,
    label: 'Kelola Outlet',
    href: '/admin/outlet',
    color: 'from-blue-500/20 to-blue-600/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: <UserPlus size={22} />,
    label: 'Kelola Pengguna',
    href: '/admin/workers',
    color: 'from-emerald-500/20 to-emerald-600/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: <Shirt size={22} />,
    label: 'Item Laundry',
    href: '/admin/item',
    color: 'from-purple-500/20 to-purple-600/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: <Truck size={22} />,
    label: 'Penempatan Staff',
    href: '/admin/assignstaff',
    color: 'from-orange-500/20 to-orange-600/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: <BarChart3 size={22} />,
    label: 'Laporan Kinerja',
    href: '/admin/performance',
    color: 'from-rose-500/20 to-rose-600/20',
    iconColor: 'text-rose-400',
  },
];

// ─── Component ───────────────────────────────────────────────

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Admin';
  const [connectionStatus, setConnectionStatus] = useState<
    'checking' | 'connected' | 'error'
  >('checking');
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
      setCurrentTime(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => {
      clearTimeout(timer);
      clearTimeout(animTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='space-y-8 overflow-y-auto p-6 lg:p-8'>
      {/* ── HEADER ──────────────────────────────────────── */}
      <div className='flex flex-col items-start justify-between gap-4 lg:flex-row'>
        <div>
          <div className='mb-2 text-xs text-slate-500'>Admin / Dashboard</div>
          <h1 className='text-3xl font-black tracking-tight lg:text-4xl'>
            Selamat Datang,{' '}
            <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
              {firstName}
            </span>{' '}
            👋
          </h1>
          <p className='mt-1 text-sm text-slate-400'>
            Ringkasan operasional dan kesehatan bisnis hari ini.
          </p>

          {/* Connection + Time */}
          <div className='mt-3 flex items-center gap-4'>
            <div
              className={`flex items-center gap-2 text-xs ${
                connectionStatus === 'connected'
                  ? 'text-green-400'
                  : connectionStatus === 'error'
                    ? 'text-red-400'
                    : 'text-yellow-400'
              }`}
            >
              <span
                className={`h-2 w-2 animate-pulse rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-green-400'
                    : connectionStatus === 'error'
                      ? 'bg-red-400'
                      : 'bg-yellow-400'
                }`}
              />
              {connectionStatus === 'connected'
                ? 'Backend Connected'
                : connectionStatus === 'error'
                  ? 'Disconnected'
                  : 'Checking...'}
            </div>
            <span className='text-xs text-slate-600'>|</span>
            <span className='text-xs text-slate-500'>{currentTime}</span>
          </div>
        </div>

        <div className='flex gap-3'>
          <button className='flex items-center gap-2 rounded-xl border border-gray-800 bg-[#1C252E] px-4 py-2.5 text-sm font-medium transition hover:cursor-pointer hover:bg-gray-800'>
            <Download size={16} /> Unduh Laporan
          </button>
        </div>
      </div>

      {/* ── STAT CARDS ──────────────────────────────────── */}
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#1C252E] p-6 transition-all duration-500 hover:border-gray-700 ${
              animatedStats
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* Gradient accent */}
            <div
              className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${stat.color} opacity-80`}
            />

            <div className='mb-4 flex items-start justify-between'>
              <p className='text-sm font-medium text-gray-400'>{stat.title}</p>
              <div
                className={`rounded-xl bg-gradient-to-br p-2.5 ${stat.color} bg-opacity-20 text-white transition-transform group-hover:scale-110`}
              >
                {stat.icon}
              </div>
            </div>
            <h2 className='mb-2 text-3xl font-black'>{stat.value}</h2>
            <div className='flex items-center gap-1.5'>
              {stat.trend === 'up' ? (
                <ArrowUpRight size={14} className='text-green-400' />
              ) : (
                <ArrowDownRight size={14} className='text-red-400' />
              )}
              <span
                className={`text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}
              >
                {stat.sub}
              </span>
              <span className='ml-1 text-[10px] text-gray-600'>
                vs bulan lalu
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── QUICK ACTIONS ──────────────────────────────── */}
      <div>
        <h3 className='mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase'>
          Aksi Cepat
        </h3>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5'>
          {QUICK_ACTIONS.map((action, i) => (
            <Link key={i} href={action.href}>
              <div className='group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-gray-800 bg-[#1C252E] p-5 transition-all hover:border-gray-600 hover:shadow-lg hover:shadow-black/20'>
                <div
                  className={`rounded-xl bg-gradient-to-br p-3 ${action.color} ${action.iconColor} transition-transform group-hover:scale-110`}
                >
                  {action.icon}
                </div>
                <span className='text-center text-xs font-semibold text-gray-400 transition-colors group-hover:text-white'>
                  {action.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ──────────────────────────── */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Recent Orders (2/3 width) */}
        <div className='overflow-hidden rounded-2xl border border-gray-800 bg-[#1C252E] lg:col-span-2'>
          <div className='flex items-center justify-between border-b border-gray-800 px-6 py-5'>
            <div className='flex items-center gap-3'>
              <div className='rounded-lg bg-blue-500/10 p-2'>
                <Activity size={18} className='text-blue-400' />
              </div>
              <h3 className='text-lg font-bold'>Pesanan Terbaru</h3>
            </div>
            <Link
              href='/admin/allorder'
              className='flex items-center gap-1 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300'
            >
              Lihat Semua <Eye size={14} />
            </Link>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-800/50 text-gray-500'>
                  <th className='px-6 py-3.5 text-left text-xs font-semibold tracking-wider uppercase'>
                    ID Pesanan
                  </th>
                  <th className='px-6 py-3.5 text-left text-xs font-semibold tracking-wider uppercase'>
                    Pelanggan
                  </th>
                  <th className='px-6 py-3.5 text-left text-xs font-semibold tracking-wider uppercase'>
                    Layanan
                  </th>
                  <th className='px-6 py-3.5 text-left text-xs font-semibold tracking-wider uppercase'>
                    Status
                  </th>
                  <th className='px-6 py-3.5 text-left text-xs font-semibold tracking-wider uppercase'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-800/50'>
                {RECENT_ORDERS.map((order, i) => (
                  <tr
                    key={i}
                    className='transition-colors hover:bg-gray-800/20'
                  >
                    <td className='px-6 py-4 text-xs font-bold text-blue-400'>
                      {order.id}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-gray-600 to-gray-700 ring-2 ring-gray-700'>
                          <img
                            src={`https://i.pravatar.cc/150?u=${order.name}`}
                            alt='user'
                            className='h-full w-full object-cover'
                          />
                        </div>
                        <span className='text-xs font-medium'>
                          {order.name}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-xs text-gray-400'>
                      {order.service}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-xs font-bold'>
                      {order.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='space-y-6'>
          {/* Outlet Performance */}
          <div className='rounded-2xl border border-gray-800 bg-[#1C252E] p-6'>
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-purple-500/10 p-2'>
                  <TrendingUp size={18} className='text-purple-400' />
                </div>
                <h3 className='font-bold'>Performa Outlet</h3>
              </div>
            </div>
            <div className='space-y-5'>
              {OUTLET_PERF.map((outlet, i) => (
                <div key={i} className='space-y-2'>
                  <div className='flex justify-between text-xs'>
                    <span className='text-gray-400'>{outlet.name}</span>
                    <span className='font-bold'>{outlet.revenue}</span>
                  </div>
                  <div className='h-2 w-full overflow-hidden rounded-full bg-gray-800'>
                    <div
                      className={`${outlet.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: animatedStats ? `${outlet.percent}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link href='/admin/outlet'>
              <button className='mt-6 w-full cursor-pointer rounded-xl border border-gray-800 py-2.5 text-xs text-gray-400 transition-all hover:bg-gray-800 hover:text-white'>
                Lihat Semua Outlet →
              </button>
            </Link>
          </div>

          {/* Active Drivers */}
          <div className='rounded-2xl border border-gray-800 bg-[#1C252E] p-6'>
            <div className='mb-5 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-orange-500/10 p-2'>
                  <Truck size={18} className='text-orange-400' />
                </div>
                <h3 className='font-bold'>Driver Aktif</h3>
              </div>
              <span className='rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-bold text-green-400'>
                {ACTIVE_DRIVERS.length} Online
              </span>
            </div>
            <div className='space-y-4'>
              {ACTIVE_DRIVERS.map((driver, i) => (
                <div
                  key={i}
                  className='group flex items-center justify-between'
                >
                  <div className='flex items-center gap-3'>
                    <div className='relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-gray-600 to-gray-700 ring-2 ring-gray-700'>
                      <img
                        src={`https://i.pravatar.cc/150?u=${driver.avatar}`}
                        alt={driver.name}
                        className='h-full w-full object-cover'
                      />
                      <span className='absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-[#1C252E] bg-green-500' />
                    </div>
                    <div>
                      <p className='text-sm font-bold transition-colors group-hover:text-blue-400'>
                        {driver.name}
                      </p>
                      <p className='text-[11px] text-gray-500'>{driver.task}</p>
                    </div>
                  </div>
                  <span className='text-[11px] text-gray-600'>
                    {driver.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER SUMMARY ─────────────────────────────── */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='flex items-center gap-4 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-5'>
          <div className='rounded-xl bg-blue-500/20 p-3'>
            <Clock size={22} className='text-blue-400' />
          </div>
          <div>
            <p className='text-2xl font-black'>24</p>
            <p className='text-xs text-gray-400'>Pesanan Dalam Proses</p>
          </div>
        </div>
        <div className='flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-5'>
          <div className='rounded-xl bg-emerald-500/20 p-3'>
            <CheckCircle2 size={22} className='text-emerald-400' />
          </div>
          <div>
            <p className='text-2xl font-black'>187</p>
            <p className='text-xs text-gray-400'>Pesanan Selesai Minggu Ini</p>
          </div>
        </div>
        <div className='flex items-center gap-4 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-5'>
          <div className='rounded-xl bg-purple-500/20 p-3'>
            <TrendingUp size={22} className='text-purple-400' />
          </div>
          <div>
            <p className='text-2xl font-black'>4.8★</p>
            <p className='text-xs text-gray-400'>Rating Rata-Rata Outlet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
