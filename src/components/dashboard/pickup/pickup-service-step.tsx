'use client';

import { Label } from '@/src/components/ui/label';
import { cn } from '@/src/lib/utils/utils';
import { Check, Grid, Shirt, Wind, Zap, LucideIcon } from 'lucide-react';

interface PickupServiceStepProps {
  selectedServices: string[];
  toggleService: (service: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
}

interface Service {
  id: string;
  icon: LucideIcon;
  desc: string;
  price: string;
}

const SERVICES: Service[] = [
  {
    id: 'Cuci Komplit',
    icon: Shirt,
    desc: 'Cuci, kering, setrika, dan packing rapi.',
    price: 'Rp 8.000/kg',
  },
  {
    id: 'Express Wash',
    icon: Zap,
    desc: 'Layanan kilat prioritas. Selesai dalam 24 jam.',
    price: 'Rp 12.000/kg',
  },
  {
    id: 'Dry Clean',
    icon: Shirt,
    desc: 'Perawatan khusus untuk jas, gaun, bahan sensitif.',
    price: 'Rp 25.000/pcs',
  },
  {
    id: 'Setrika Saja',
    icon: Wind,
    desc: 'Jasa setrika uap profesional untuk hasil rapi.',
    price: 'Rp 6.000/kg',
  },
];

function SectionHeader() {
  return (
    <div className='mb-4 flex items-center gap-3 border-t border-slate-300 pt-4 dark:border-slate-700'>
      <div className='flex items-center justify-center rounded-lg bg-blue-500 p-2 text-white'>
        <Grid className='h-6 w-6' />
      </div>
      <h2 className='text-xl font-bold text-black dark:text-white'>
        3. Detail Layanan
      </h2>
    </div>
  );
}

function ServiceCard({
  service,
  isSelected,
  onToggle,
}: {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const Icon = service.icon;
  return (
    <label className='group cursor-pointer'>
      <input
        type='checkbox'
        className='peer sr-only'
        checked={isSelected}
        onChange={onToggle}
      />
      <div
        className={cn(
          'relative flex h-full flex-col rounded-xl border p-5 text-left transition-all',
          isSelected
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-300 bg-white hover:border-blue-400 dark:border-slate-600 dark:bg-slate-800'
        )}
      >
        {isSelected && <SelectionBadge />}
        <ServiceIcon Icon={Icon} isSelected={isSelected} />
        <h3 className='mb-1 text-lg font-bold text-black dark:text-white'>
          {service.id}
        </h3>
        <p className='mb-3 flex-1 text-xs text-gray-500 dark:text-gray-400'>
          {service.desc}
        </p>
        <ServicePrice price={service.price} />
      </div>
    </label>
  );
}

function SelectionBadge() {
  return (
    <div className='absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm'>
      <Check className='h-4 w-4 text-white' strokeWidth={3} />
    </div>
  );
}

function ServiceIcon({
  Icon,
  isSelected,
}: {
  Icon: LucideIcon;
  isSelected: boolean;
}) {
  return (
    <div
      className={cn(
        'mb-4 flex size-10 items-center justify-center rounded-lg transition-colors',
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
      )}
    >
      <Icon className='h-6 w-6' />
    </div>
  );
}

function ServicePrice({ price }: { price: string }) {
  return (
    <div className='flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700'>
      <span className='text-xs text-gray-500 dark:text-gray-400'>
        Mulai dari
      </span>
      <span className='text-sm font-bold text-black dark:text-white'>
        {price}
      </span>
    </div>
  );
}

function NotesSection({
  notes,
  setNotes,
}: {
  notes: string;
  setNotes: (v: string) => void;
}) {
  return (
    <div className='rounded-xl border border-slate-300 bg-slate-200 p-6 dark:border-slate-700 dark:bg-slate-800'>
      <Label className='mb-2 flex items-center gap-2 font-bold text-black dark:text-white'>
        Catatan Tambahan
        <span className='text-xs font-normal text-gray-500 dark:text-gray-400'>
          (Opsional)
        </span>
      </Label>
      <textarea
        className='focus:ring-primary h-24 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder-gray-600'
        placeholder='Contoh: Tolong pisahkan kemeja putih, kode pagar 1234.'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}

export function PickupServiceStep({
  selectedServices,
  toggleService,
  notes,
  setNotes,
}: PickupServiceStepProps) {
  return (
    <section>
      <SectionHeader />
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedServices.includes(service.id)}
            onToggle={() => toggleService(service.id)}
          />
        ))}
      </div>
      <NotesSection notes={notes} setNotes={setNotes} />
    </section>
  );
}
