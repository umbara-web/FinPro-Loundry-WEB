import { Edit, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { LaundryItem } from './pickup-constants';

// Laundry Item Row Component
interface LaundryItemRowProps {
  item: LaundryItem;
  quantity: number;
  onUpdate: (id: string, delta: number) => void;
}

export function LaundryItemRow({
  item,
  quantity,
  onUpdate,
}: LaundryItemRowProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      const diff = 0 - quantity;
      if (diff !== 0) onUpdate(item.id, diff);
      return;
    }

    if (!/^\d+$/.test(value)) {
      toast.error('Kesalahan input, masukkan angka');
      return;
    }

    const newQuantity = parseInt(value, 10);
    const diff = newQuantity - quantity;
    if (diff !== 0) {
      onUpdate(item.id, diff);
    }
  };

  return (
    <div className='flex items-center justify-between bg-white p-4 dark:bg-slate-900'>
      <div className='flex items-center gap-3'>
        <div className='flex size-10 items-center justify-center rounded bg-slate-100 text-blue-500 dark:bg-slate-800'>
          {item.icon}
        </div>
        <div>
          <p className='font-medium text-black dark:text-white'>{item.name}</p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            {item.description}
          </p>
        </div>
      </div>
      <div className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800'>
        <button
          onClick={() => onUpdate(item.id, -1)}
          className='size-8 cursor-pointer rounded text-gray-400 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
        >
          <Minus className='mx-auto h-4 w-4' />
        </button>
        <input
          type='text'
          value={quantity}
          onChange={handleInputChange}
          className='w-10 bg-transparent text-center font-bold text-black outline-none dark:text-white'
        />
        <button
          onClick={() => onUpdate(item.id, 1)}
          className='size-8 cursor-pointer rounded bg-blue-500 text-white transition-colors hover:bg-blue-600'
        >
          <Plus className='mx-auto h-4 w-4' />
        </button>
      </div>
    </div>
  );
}

// Manual Item Row Component
interface ManualItemRowProps {
  item: { name: string; quantity: number };
  index: number;
  onUpdate: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}

export function ManualItemRow({
  item,
  index,
  onUpdate,
  onRemove,
}: ManualItemRowProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      const diff = 0 - item.quantity;
      if (diff !== 0) onUpdate(index, diff);
      return;
    }

    if (!/^\d+$/.test(value)) {
      toast.error('Kesalahan input, masukkan angka');
      return;
    }

    const newQuantity = parseInt(value, 10);
    const diff = newQuantity - item.quantity;
    if (diff !== 0) {
      onUpdate(index, diff);
    }
  };

  return (
    <div className='flex items-center justify-between bg-white p-4 dark:bg-slate-900'>
      <div className='flex items-center gap-3'>
        <div className='flex size-10 items-center justify-center rounded bg-slate-100 text-blue-500 dark:bg-slate-800'>
          <Edit className='h-5 w-5' />
        </div>
        <div>
          <p className='font-medium text-black dark:text-white'>{item.name}</p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            Item Manual
          </p>
        </div>
      </div>
      <div className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800'>
        <button
          onClick={() => {
            if (item.quantity === 1) {
              onRemove(index);
            } else {
              onUpdate(index, -1);
            }
          }}
          className='size-8 rounded text-gray-400 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
        >
          <Minus className='mx-auto h-4 w-4' />
        </button>
        <input
          type='text'
          value={item.quantity}
          onChange={handleInputChange}
          className='w-10 bg-transparent text-center font-bold text-black outline-none dark:text-white'
        />
        <button
          onClick={() => onUpdate(index, 1)}
          className='flex size-8 items-center justify-center rounded bg-blue-500/20 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white'
        >
          <Plus className='mx-auto h-4 w-4' />
        </button>
      </div>
    </div>
  );
}
