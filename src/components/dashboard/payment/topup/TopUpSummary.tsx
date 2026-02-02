'use client';

import { Check, Info, Wallet } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface TopUpSummaryProps {
  balance: number;
  nominal: number;
  adminFee: number;
  total: number;
  isLoading: boolean;
  onTopUp: () => void;
}

export function TopUpSummary({
  balance,
  nominal,
  adminFee,
  total,
  isLoading,
  onTopUp,
}: TopUpSummaryProps) {
  return (
    <div className='sticky top-4 flex flex-col gap-4'>
      <BalanceCard balance={balance} />
      <SummaryCard
        nominal={nominal}
        adminFee={adminFee}
        total={total}
        isLoading={isLoading}
        onTopUp={onTopUp}
      />
      <HelpInfo />
    </div>
  );
}

function BalanceCard({ balance }: { balance: number }) {
  return (
    <div className='rounded-xl bg-linear-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg shadow-blue-500/20'>
      <p className='mb-1 text-xs font-bold tracking-wider text-blue-100 uppercase'>
        Saldo Saat Ini
      </p>
      <h3 className='text-2xl font-bold'>
        Rp {balance.toLocaleString('id-ID')}
      </h3>
      <div className='mt-4 flex items-center justify-between border-t border-white/20 pt-4'>
        <span className='text-xs text-blue-100'>FreshLaundry Wallet</span>
        <Check className='opacity-50' />
      </div>
    </div>
  );
}

interface SummaryCardProps {
  nominal: number;
  adminFee: number;
  total: number;
  isLoading: boolean;
  onTopUp: () => void;
}

function SummaryCard({
  nominal,
  adminFee,
  total,
  isLoading,
  onTopUp,
}: SummaryCardProps) {
  return (
    <div className='dark:bg-surface-dark rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#324d67]'>
      <h3 className='mb-4 text-base font-bold text-slate-900 dark:text-white'>
        Ringkasan
      </h3>
      <SummaryDetails nominal={nominal} adminFee={adminFee} />
      <TotalSection total={total} />
      <TopUpButton
        isLoading={isLoading}
        isDisabled={nominal === 0}
        onTopUp={onTopUp}
      />
      <TermsText />
    </div>
  );
}

function SummaryDetails({
  nominal,
  adminFee,
}: {
  nominal: number;
  adminFee: number;
}) {
  return (
    <div className='mb-4 flex flex-col gap-3 border-b border-slate-100 pb-4 dark:border-[#324d67]'>
      <div className='flex justify-between text-sm'>
        <span className='text-slate-500 dark:text-[#92adc9]'>Top Up</span>
        <span className='font-medium text-slate-900 dark:text-white'>
          Rp {nominal.toLocaleString('id-ID')}
        </span>
      </div>
      <div className='flex justify-between text-sm'>
        <span className='text-slate-500 dark:text-[#92adc9]'>Biaya Admin</span>
        <span className='font-medium text-slate-900 dark:text-white'>
          Rp {adminFee.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  );
}

function TotalSection({ total }: { total: number }) {
  return (
    <div className='flex items-center justify-between py-4'>
      <span className='text-base font-bold text-slate-900 dark:text-white'>
        Total Bayar
      </span>
      <span className='text-xl font-black text-black dark:text-white'>
        Rp {total.toLocaleString('id-ID')}
      </span>
    </div>
  );
}

interface TopUpButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  onTopUp: () => void;
}

function TopUpButton({ isLoading, isDisabled, onTopUp }: TopUpButtonProps) {
  return (
    <Button
      onClick={onTopUp}
      disabled={isLoading || isDisabled}
      className='flex w-full transform items-center justify-center gap-2 rounded-xl bg-blue-500 py-6 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:border hover:border-blue-500 hover:bg-white/5 hover:text-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50'
    >
      <Wallet className='h-5 w-5' />
      {isLoading ? 'Memproses...' : 'Top Up Sekarang'}
    </Button>
  );
}

function TermsText() {
  return (
    <p className='mt-4 text-center text-[10px] leading-relaxed text-slate-400 dark:text-[#92adc9]'>
      Dengan menekan tombol di atas, Anda menyetujui Syarat & Ketentuan yang
      berlaku di LaundryKu.
    </p>
  );
}

function HelpInfo() {
  return (
    <div className='dark:bg-primary/5 dark:border-primary/20 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4'>
      <Info className='text-primary h-5 w-5' />
      <div>
        <p className='text-primary mb-1 text-xs font-bold'>Butuh Bantuan?</p>
        <p className='text-[11px] text-slate-600 dark:text-[#92adc9]'>
          Hubungi CS kami jika Anda mengalami kendala saat melakukan pengisian
          saldo.
        </p>
      </div>
    </div>
  );
}
