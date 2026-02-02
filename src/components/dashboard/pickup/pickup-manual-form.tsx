import { Edit, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Manual Item Form Component
interface ManualItemFormProps {
  onAdd: (item: { name: string; quantity: number }) => void;
}

export function ManualItemForm({ onAdd }: ManualItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    if (name.trim() && quantity > 0) {
      onAdd({ name: name.trim(), quantity });
      setName('');
      setQuantity(0);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setQuantity(0);
      return;
    }

    if (!/^\d+$/.test(value)) {
      toast.error('Kesalahan input, masukkan angka');
      return;
    }

    setQuantity(parseInt(value, 10));
  };

  return (
    <div className='col-span-1 flex flex-col gap-4 border-t border-slate-200 bg-white p-4 md:col-span-2 dark:border-slate-700 dark:bg-slate-900'>
      <div className='flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-4'>
        {/* Input Section */}
        <div className='flex flex-1 items-start gap-3'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded bg-blue-500/20 text-blue-500'>
            <Edit className='h-5 w-5' />
          </div>
          <div className='w-full'>
            <label className='mb-1 block text-xs font-bold tracking-wider text-black uppercase dark:text-white'>
              Item Manual (Lainnya)
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-black placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-gray-500'
              placeholder='Ketik nama item...'
              type='text'
            />
          </div>
        </div>

        {/* Quantity Section */}
        <div className='flex items-center self-end rounded-lg border border-slate-300 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800'>
          <button
            onClick={() => setQuantity(Math.max(0, quantity - 1))}
            className='flex size-8 cursor-pointer items-center justify-center rounded text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
          >
            <Minus className='h-4 w-4' />
          </button>
          <input
            type='text'
            value={quantity}
            onChange={handleQuantityChange}
            className='w-12 bg-transparent text-center font-bold text-black outline-none dark:text-white'
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className='flex size-8 cursor-pointer items-center justify-center rounded bg-blue-500 text-white transition-colors hover:bg-blue-600'
          >
            <Plus className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        disabled={!name.trim() || quantity === 0}
        className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-500/50 py-3 font-medium text-blue-500 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-blue-500/10'
      >
        <div className='flex size-5 items-center justify-center rounded-full bg-blue-500 text-white'>
          <Plus className='h-3 w-3' />
        </div>
        Tambah Item Lainnya
      </button>
    </div>
  );
}
