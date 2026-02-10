'use client';

import { Banknote, CheckCircle, Wallet } from 'lucide-react';

interface PaymentSummaryCardsProps {
  totalSpending: number;
  successfulTransactions: number;
  favoriteMethod: string;
}

/** Format number to Indonesian Rupiah */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PaymentSummaryCards({
  totalSpending,
  successfulTransactions,
  favoriteMethod,
}: PaymentSummaryCardsProps) {
  const cards = [
    {
      label: 'Total Pengeluaran (Bln Ini)',
      value: formatCurrency(totalSpending),
      icon: Banknote,
      iconBg: 'bg-blue-500/10',
      iconBorder: 'border-blue-500/20',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Transaksi Berhasil',
      value: `${successfulTransactions} Transaksi`,
      icon: CheckCircle,
      iconBg: 'bg-green-500/10',
      iconBorder: 'border-green-500/20',
      iconColor: 'text-green-500',
    },
    {
      label: 'Metode Terfavorit',
      value: favoriteMethod || '-',
      icon: Wallet,
      iconBg: 'bg-amber-500/10',
      iconBorder: 'border-amber-500/20',
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6'>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className='flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform hover:scale-[1.01] md:gap-5 md:p-6 dark:border-slate-700 dark:bg-[#101922]'
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${card.iconBg} ${card.iconBorder} md:h-14 md:w-14`}
            >
              <Icon className={`h-7 w-7 ${card.iconColor} md:h-8 md:w-8`} />
            </div>
            <div>
              <p className='mb-1 text-[10px] leading-none font-bold tracking-wider text-slate-500 uppercase'>
                {card.label}
              </p>
              <h3 className='text-xl font-bold text-slate-900 md:text-2xl dark:text-white'>
                {card.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
