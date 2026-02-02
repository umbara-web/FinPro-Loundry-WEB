'use client';

import { Package } from 'lucide-react';
import { LAUNDRY_ITEMS } from './pickup-constants';
import { LaundryItemRow, ManualItemRow } from './pickup-item-rows';
import { ManualItemForm } from './pickup-manual-form';

export function SectionHeader() {
  return (
    <div className='mb-4 border-t border-slate-300 pt-4 dark:border-slate-700'>
      <div className='mb-2 flex items-center gap-3'>
        <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
          <Package className='h-6 w-6' />
        </div>
        <h2 className='text-xl font-bold text-black dark:text-white'>
          3. Daftar Item Laundry
        </h2>
      </div>
    </div>
  );
}

interface PickupItemsStepProps {
  items: Record<string, number>;
  onUpdateItem: (id: string, delta: number) => void;
  manualItems: { name: string; quantity: number }[];
  onAddManualItem: (item: { name: string; quantity: number }) => void;
  onUpdateManualItem: (index: number, delta: number) => void;
  onRemoveManualItem: (index: number) => void;
}

export function PickupItemsStep({
  items,
  onUpdateItem,
  manualItems,
  onAddManualItem,
  onUpdateManualItem,
  onRemoveManualItem,
}: PickupItemsStepProps) {
  return (
    <section>
      <SectionHeader />
      <div className='overflow-hidden rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'>
        <div className='grid grid-cols-1 gap-px bg-slate-200 md:grid-cols-2 dark:bg-slate-700'>
          {LAUNDRY_ITEMS.map((item) => (
            <LaundryItemRow
              key={item.id}
              item={item}
              quantity={items[item.id] || 0}
              onUpdate={onUpdateItem}
            />
          ))}

          {/* Manual Items Display */}
          {manualItems.map((item, index) => (
            <ManualItemRow
              key={`manual-${index}`}
              item={item}
              index={index}
              onUpdate={onUpdateManualItem}
              onRemove={onRemoveManualItem}
            />
          ))}

          <ManualItemForm onAdd={onAddManualItem} />
        </div>
      </div>
    </section>
  );
}
