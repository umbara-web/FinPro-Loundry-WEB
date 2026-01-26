'use client';

import clsx from 'clsx';
import Image from 'next/image';

export interface PaymentMethodConfig {
  id: string;
  name: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  category: 'ewallet' | 'va';
}

interface TopUpPaymentMethodsProps {
  paymentMethod: string;
  onMethodChange: (method: string) => void;
}

const EWALLET_METHODS: PaymentMethodConfig[] = [
  {
    id: 'gopay',
    name: 'GoPay',
    icon: '/icons/gopay.svg',
    iconWidth: 70,
    iconHeight: 40,
    category: 'ewallet',
  },
  {
    id: 'ovo',
    name: 'OVO',
    icon: '/icons/Ovo.svg',
    iconWidth: 60,
    iconHeight: 30,
    category: 'ewallet',
  },
  {
    id: 'dana',
    name: 'DANA',
    icon: '/icons/Dana.svg',
    iconWidth: 65,
    iconHeight: 40,
    category: 'ewallet',
  },
];

const VA_METHODS: PaymentMethodConfig[] = [
  {
    id: 'bri',
    name: 'Bank Rakyat Indonesia',
    icon: '/icons/bri.svg',
    iconWidth: 60,
    iconHeight: 40,
    category: 'va',
  },
  {
    id: 'bca',
    name: 'BCA Virtual Account',
    icon: '/icons/bca.svg',
    iconWidth: 70,
    iconHeight: 60,
    category: 'va',
  },
  {
    id: 'mandiri',
    name: 'Mandiri Virtual Account',
    icon: '/icons/mandiri.svg',
    iconWidth: 70,
    iconHeight: 60,
    category: 'va',
  },
];

export function TopUpPaymentMethods({
  paymentMethod,
  onMethodChange,
}: TopUpPaymentMethodsProps) {
  return (
    <div className='dark:bg-surface-dark rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#324d67]'>
      <h3 className='mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white'>
        Metode Pembayaran
      </h3>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <PaymentCategory
          title='E-Wallet'
          methods={EWALLET_METHODS}
          selectedMethod={paymentMethod}
          onSelect={onMethodChange}
        />
        <PaymentCategory
          title='Virtual Account'
          methods={VA_METHODS}
          selectedMethod={paymentMethod}
          onSelect={onMethodChange}
        />
      </div>
    </div>
  );
}

interface PaymentCategoryProps {
  title: string;
  methods: PaymentMethodConfig[];
  selectedMethod: string;
  onSelect: (method: string) => void;
}

function PaymentCategory({
  title,
  methods,
  selectedMethod,
  onSelect,
}: PaymentCategoryProps) {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-xs font-semibold text-slate-500 dark:text-[#92adc9]'>
        {title}
      </p>
      {methods.map((method) => (
        <PaymentMethodItem
          key={method.id}
          method={method}
          isSelected={selectedMethod === method.id}
          onSelect={() => onSelect(method.id)}
        />
      ))}
    </div>
  );
}

interface PaymentMethodItemProps {
  method: PaymentMethodConfig;
  isSelected: boolean;
  onSelect: () => void;
}

function PaymentMethodItem({
  method,
  isSelected,
  onSelect,
}: PaymentMethodItemProps) {
  const containerClasses = clsx(
    'flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all',
    isSelected
      ? 'text-primary dark:bg-primary/5 border-blue-500 dark:text-black'
      : 'border-slate-200 hover:border-blue-500 hover:bg-slate-50 dark:border-[#324d67] dark:bg-[#111a22] dark:text-white dark:hover:border-blue-500'
  );

  return (
    <label className={containerClasses}>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-20 items-center justify-center rounded bg-slate-100 dark:bg-[#111a22]'>
          <Image
            src={method.icon}
            alt={method.id}
            width={method.iconWidth}
            height={method.iconHeight}
          />
        </div>
        <span className='font-semibold text-slate-900 dark:text-white'>
          {method.name}
        </span>
      </div>
      <input
        checked={isSelected}
        onChange={onSelect}
        className='text-primary focus:ring-primary h-5 w-5 border-slate-300'
        name='payment'
        type='radio'
      />
    </label>
  );
}
