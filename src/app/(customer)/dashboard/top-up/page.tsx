'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@/src/context/WalletContext';
import { useRouter } from 'next/navigation';
import {
  NominalSelector,
  TopUpPaymentMethods,
  TopUpSummary,
} from '@/src/components/dashboard/payment/topup';

const NOMINAL_OPTIONS = [20000, 50000, 100000, 200000, 500000];
const ADMIN_FEE = 1000;

export default function TopUpPage() {
  const router = useRouter();
  const { balance, topUp, isLoading } = useWallet();
  const [selectedNominal, setSelectedNominal] = useState<number | null>(50000);
  const [customNominal, setCustomNominal] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('gopay');

  const nominal = selectedNominal || Number(customNominal) || 0;
  const total = nominal + ADMIN_FEE;

  const handleNominalClick = (amount: number) => {
    setSelectedNominal(amount);
    setCustomNominal('');
  };

  const handleCustomNominalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedNominal(null);
    setCustomNominal(e.target.value);
  };

  const handleCustomClick = () => setSelectedNominal(null);

  const handleTopUp = async () => {
    if (nominal > 0) {
      await topUp(nominal);
      router.push('/dashboard');
    }
  };

  return (
    <main className='dark:bg-background-dark bg-background-light flex-1 overflow-y-auto p-4 md:p-8'>
      <div className='mx-auto flex max-w-6xl flex-col gap-6'>
        <BackLink />
        <PageHeader />
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <LeftColumn
            nominals={NOMINAL_OPTIONS}
            selectedNominal={selectedNominal}
            customNominal={customNominal}
            paymentMethod={paymentMethod}
            onNominalClick={handleNominalClick}
            onCustomClick={handleCustomClick}
            onCustomChange={handleCustomNominalChange}
            onPaymentMethodChange={setPaymentMethod}
          />
          <RightColumn
            balance={balance}
            nominal={nominal}
            adminFee={ADMIN_FEE}
            total={total}
            isLoading={isLoading}
            onTopUp={handleTopUp}
          />
        </div>
        <div className='h-10'></div>
      </div>
    </main>
  );
}

function BackLink() {
  return (
    <div className='flex items-center gap-2'>
      <Link
        href='/dashboard'
        className='text-primary flex items-center gap-1 text-sm font-medium hover:underline'
      >
        <ArrowLeft className='h-4 w-4' />
        Kembali ke Dashboard
      </Link>
    </div>
  );
}

function PageHeader() {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='text-2xl font-black tracking-tight text-slate-900 md:text-3xl dark:text-white'>
        Isi Ulang Saldo
      </h1>
      <p className='text-slate-500 dark:text-[#92adc9]'>
        Pilih nominal dan metode pembayaran yang Anda inginkan.
      </p>
    </div>
  );
}

interface LeftColumnProps {
  nominals: number[];
  selectedNominal: number | null;
  customNominal: string;
  paymentMethod: string;
  onNominalClick: (amount: number) => void;
  onCustomClick: () => void;
  onCustomChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaymentMethodChange: (method: string) => void;
}

function LeftColumn({
  nominals,
  selectedNominal,
  customNominal,
  paymentMethod,
  onNominalClick,
  onCustomClick,
  onCustomChange,
  onPaymentMethodChange,
}: LeftColumnProps) {
  return (
    <div className='flex flex-col gap-6 md:col-span-8'>
      <NominalSelector
        nominals={nominals}
        selectedNominal={selectedNominal}
        customNominal={customNominal}
        onNominalClick={onNominalClick}
        onCustomClick={onCustomClick}
        onCustomChange={onCustomChange}
      />
      <TopUpPaymentMethods
        paymentMethod={paymentMethod}
        onMethodChange={onPaymentMethodChange}
      />
    </div>
  );
}

interface RightColumnProps {
  balance: number;
  nominal: number;
  adminFee: number;
  total: number;
  isLoading: boolean;
  onTopUp: () => void;
}

function RightColumn({
  balance,
  nominal,
  adminFee,
  total,
  isLoading,
  onTopUp,
}: RightColumnProps) {
  return (
    <div className='md:col-span-4'>
      <TopUpSummary
        balance={balance}
        nominal={nominal}
        adminFee={adminFee}
        total={total}
        isLoading={isLoading}
        onTopUp={onTopUp}
      />
    </div>
  );
}
