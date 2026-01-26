'use client';

import clsx from 'clsx';

interface NominalSelectorProps {
  nominals: number[];
  selectedNominal: number | null;
  customNominal: string;
  onNominalClick: (amount: number) => void;
  onCustomClick: () => void;
  onCustomChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NominalSelector({
  nominals,
  selectedNominal,
  customNominal,
  onNominalClick,
  onCustomClick,
  onCustomChange,
}: NominalSelectorProps) {
  return (
    <div className='dark:bg-surface-dark rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#324d67]'>
      <h3 className='mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white'>
        Pilih Nominal
      </h3>
      <NominalButtons
        nominals={nominals}
        selectedNominal={selectedNominal}
        customNominal={customNominal}
        onNominalClick={onNominalClick}
        onCustomClick={onCustomClick}
      />
      <CustomNominalInput value={customNominal} onChange={onCustomChange} />
    </div>
  );
}

interface NominalButtonsProps {
  nominals: number[];
  selectedNominal: number | null;
  customNominal: string;
  onNominalClick: (amount: number) => void;
  onCustomClick: () => void;
}

function NominalButtons({
  nominals,
  selectedNominal,
  customNominal,
  onNominalClick,
  onCustomClick,
}: NominalButtonsProps) {
  const getButtonClasses = (isSelected: boolean) =>
    clsx(
      'cursor-pointer rounded-lg px-4 py-3 font-semibold transition-all',
      isSelected
        ? 'bg-blue-500 text-white dark:border-[#324d67]'
        : 'border border-slate-200 hover:border-blue-500 dark:border-[#324d67] dark:bg-[#111a22] dark:text-white dark:hover:border-blue-500'
    );

  return (
    <div className='mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3'>
      {nominals.map((amount) => (
        <button
          key={amount}
          onClick={() => onNominalClick(amount)}
          className={getButtonClasses(selectedNominal === amount)}
        >
          Rp {amount.toLocaleString('id-ID')}
        </button>
      ))}
      <button
        onClick={onCustomClick}
        className={getButtonClasses(
          selectedNominal === null && customNominal === ''
        )}
      >
        Custom
      </button>
    </div>
  );
}

interface CustomNominalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomNominalInput({ value, onChange }: CustomNominalInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium text-slate-500 dark:text-[#92adc9]'>
        Atau masukkan nominal sendiri
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
          <span className='font-bold text-slate-500'>Rp</span>
        </div>
        <input
          className='focus:ring-primary focus:border-primary block w-full rounded-lg border-slate-200 bg-slate-50 py-3 pr-4 pl-12 font-bold text-slate-900 dark:border-[#324d67] dark:bg-[#111a22] dark:text-white'
          placeholder='0'
          type='number'
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
