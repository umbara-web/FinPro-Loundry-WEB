import { Receipt, Info, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { LAUNDRY_ITEMS } from './pickup-constants';

export function SummaryHeader() {
  return (
    <h3 className='mb-5 flex items-center gap-2 text-lg font-bold text-black dark:text-white'>
      <Receipt className='h-5 w-5' />
      Ringkasan Pesanan
    </h3>
  );
}

export function InfoNotice() {
  return (
    <div className='mb-6 flex items-start gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20'>
      <Info className='mt-0.5 h-4 w-4' />
      <p className='text-xs leading-tight text-blue-800 dark:text-blue-200'>
        Total harga akan dihitung setelah laundry ditimbang oleh petugas outlet.
      </p>
    </div>
  );
}

interface NotesInputProps {
  notes: string;
  setNotes: (v: string) => void;
}

export function NotesInput({ notes, setNotes }: NotesInputProps) {
  return (
    <div className='mb-6'>
      <label className='mb-2 block text-sm font-medium text-black dark:text-white'>
        Catatan Tambahan (Opsional)
      </label>
      <textarea
        className='h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white'
        placeholder='Contoh: pisahkan kemeja putih, instruksi penjemputan khusus, dll.'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}

interface SubmitButtonProps {
  isLoading: boolean;
  disabled: boolean;
}

export function SubmitButton({ isLoading, disabled }: SubmitButtonProps) {
  return (
    <Button className='w-full' type='button' disabled={disabled}>
      {isLoading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Memproses...
        </>
      ) : (
        <>
          <span>Konfirmasi Pesanan</span>
          <ArrowRight className='ml-2 h-4 w-4' />
        </>
      )}
    </Button>
  );
}

interface PickupItemsListProps {
  items: Record<string, number>;
  manualItems: { name: string; quantity: number }[];
}

export function PickupItemsList({ items, manualItems }: PickupItemsListProps) {
  const itemsCount = Object.values(items).reduce((a, b) => a + b, 0);
  const hasItems = itemsCount > 0 || manualItems.length > 0;

  if (!hasItems) return 'Belum ada item';

  // Convert items record to array
  const selectedItems = Object.entries(items)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = LAUNDRY_ITEMS.find((i) => i.id === id);
      return { name: item?.name || id, qty };
    });

  // Add manual items
  const allItems = [
    ...selectedItems,
    ...manualItems.map((item) => ({ name: item.name, qty: item.quantity })),
  ];

  return (
    <div className='mt-1 space-y-1'>
      {allItems.map((item, idx) => (
        <div
          key={idx}
          className='flex justify-between text-xs text-gray-500 dark:text-gray-400'
        >
          <span>{item.name}</span>
          <span className='font-medium text-black dark:text-white'>
            {item.qty}x
          </span>
        </div>
      ))}
    </div>
  );
}
