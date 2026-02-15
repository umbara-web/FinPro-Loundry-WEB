'use client';

import {
  Search, Bell, Settings, Download, Plus,
  TrendingUp, Shirt, Truck, Store,
  UserPlus, CheckCircle2, Package, Megaphone, LogOut
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';


function SidebarDashboard() {
  const menu = [
    { label: 'Dashboard', icon: <Store size={20} />, href: '/admin/dashboard' },
    { label: 'MANAJEMEN', isHeader: true },
    { label: 'Outlet', icon: <Store size={20} />, href: '/admin/outlet' },
    { label: 'Pengguna', icon: <UserPlus size={20} />, href: '/admin/workers' },
    { label: 'Pesanan', icon: <Shirt size={20} />, badge: 12, href: '/admin/allorder' },
    { label: 'Penempatan Staff', icon: <Truck size={20} />, href: '/admin/assignstaff' },

    { label: 'LAPORAN KINERJA', isHeader: true },
    { label: 'Laporan Kinerja Karyawan', icon: <TrendingUp size={20} />, href: '/admin/performance' },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <aside className="w-64 bg-[#1C252E] border-r border-gray-800 flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white italic">C</div>
        <h2 className="text-xl font-black tracking-tight">Dashboard Admin</h2>
      </div>

      <nav className="flex-1 space-y-1">
        {menu.map((item: any, idx) => (
          item.isHeader ? (
            <p key={idx} className="text-[10px] font-bold text-gray-600 mt-6 mb-2 tracking-widest px-4 uppercase">{item.label}</p>
          ) : item.href ? (
            <Link key={idx} href={item.href} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition hover:cursor-pointer ${item.active ? 'bg-blue-500 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && <span className="bg-red-500 text-[10px] text-white px-2 py-0.5 rounded-full">{item.badge}</span>}
            </Link>
          ) : (
            <button key={idx} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition hover:cursor-pointer ${item.active ? 'bg-blue-500 text-white font-bold' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && <span className="bg-red-500 text-[10px] text-white px-2 py-0.5 rounded-full">{item.badge}</span>}
            </button>
          )
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800 space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all hover:cursor-pointer"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SidebarDashboard;
