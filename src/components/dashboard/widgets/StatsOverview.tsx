'use client';

import { WashingMachine, Wallet, Crown } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@/src/context/WalletContext';
import { getMembershipTier } from '@/src/lib/utils/membership';

export function StatsOverview() {
  const { balance, activeOrders, points } = useWallet();
  const activeOrdersCount = activeOrders.length;
  const tier = getMembershipTier(points);

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <ActiveOrdersCard count={activeOrdersCount} />
      <WalletCard balance={balance} />
      <PointsCard points={points} tier={tier} />
    </div>
  );
}

function ActiveOrdersCard({ count }: { count: number }) {
  return (
    <div className='dark:bg-surface-dark bg-surface-light flex flex-col gap-2 rounded-xl border border-slate-200 p-5 shadow-sm dark:border-[#324d67]'>
      <div className='flex items-start justify-between'>
        <div className='rounded-lg bg-blue-100 p-2 text-blue-400 dark:bg-blue-500/20'>
          <WashingMachine className='h-6 w-6' />
        </div>
        <span className='rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-[#324d67] dark:text-[#92adc9]'>
          +1 hari ini
        </span>
      </div>
      <div className='mt-2'>
        <p className='text-sm font-medium text-slate-500 dark:text-[#92adc9]'>
          Pesanan Aktif
        </p>
        <p className='text-2xl font-bold text-slate-900 dark:text-white'>
          {count}
        </p>
      </div>
    </div>
  );
}

function WalletCard({ balance }: { balance: number }) {
  return (
    <div className='dark:bg-surface-dark bg-surface-light flex flex-col gap-2 rounded-xl border border-slate-200 p-5 shadow-sm dark:border-[#324d67]'>
      <div className='flex items-start justify-between'>
        <div className='rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'>
          <Wallet className='h-6 w-6' />
        </div>
        <Link
          href='/dashboard/top-up'
          className='text-primary text-lg font-bold hover:text-blue-500 hover:underline dark:text-white'
        >
          Top Up
        </Link>
      </div>
      <div className='mt-2'>
        <p className='text-sm font-medium text-slate-500 dark:text-[#92adc9]'>
          Saldo Wallet
        </p>
        <p className='text-2xl font-bold text-slate-900 dark:text-white'>
          Rp {balance.toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}

interface TierInfo {
  label: string;
  colorClass: string;
}

function PointsCard({ points, tier }: { points: number; tier: TierInfo }) {
  return (
    <div className='dark:bg-surface-dark bg-surface-light flex flex-col gap-2 rounded-xl border border-slate-200 p-5 shadow-sm dark:border-[#324d67]'>
      <div className='flex items-start justify-between'>
        <div className='rounded-lg bg-amber-100 p-2 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'>
          <Crown className='h-6 w-6' />
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${tier.colorClass}`}
        >
          {tier.label}
        </span>
      </div>
      <div className='mt-2'>
        <p className='text-sm font-medium text-slate-500 dark:text-[#92adc9]'>
          Poin Reward
        </p>
        <p className='text-2xl font-bold text-slate-900 dark:text-white'>
          {points} Poin
        </p>
      </div>
    </div>
  );
}
