import { Users, UserCheck, Clock, UserX } from 'lucide-react';

interface SummaryCardsProps {
  total: number;
  present: number;
  late: number;
  absent: number;
}

const cards = [
  {
    key: 'total',
    label: 'Total',
    icon: Users,
    iconColor: 'text-blue-600 dark:text-[#0a7ff5]',
    iconBg: 'bg-blue-100 dark:bg-[#0a7ff5]/10',
  },
  {
    key: 'present',
    label: 'Hadir',
    icon: UserCheck,
    iconColor: 'text-green-600 dark:text-green-500',
    iconBg: 'bg-green-100 dark:bg-green-500/10',
  },
  {
    key: 'late',
    label: 'Terlambat',
    icon: Clock,
    iconColor: 'text-orange-600 dark:text-orange-500',
    iconBg: 'bg-orange-100 dark:bg-orange-500/10',
  },
  {
    key: 'absent',
    label: 'Tidak Hadir',
    icon: UserX,
    iconColor: 'text-red-600 dark:text-red-500',
    iconBg: 'bg-red-100 dark:bg-red-500/10',
  },
] as const;

export function SummaryCards({
  total,
  present,
  late,
  absent,
}: SummaryCardsProps) {
  const values = { total, present, late, absent };

  return (
    <div className='mb-6 grid grid-cols-2 gap-3 md:grid-cols-4'>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className='rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-[#182634]'
          >
            <div className='flex items-center gap-3'>
              <div className={`rounded-lg ${card.iconBg} p-2`}>
                <Icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
              <div>
                <p className='text-xs text-slate-500 dark:text-slate-400'>
                  {card.label}
                </p>
                <p className='text-lg font-bold text-slate-900 dark:text-white'>
                  {values[card.key]}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
