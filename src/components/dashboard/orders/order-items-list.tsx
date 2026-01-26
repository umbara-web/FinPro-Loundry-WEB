interface OrderItem {
  id: string;
  qty: number;
  laundry_item: {
    name: string;
  };
}

interface OrderItemsListProps {
  items?: OrderItem[];
}

export function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <div className='dark:bg-surface-dark rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700'>
      <h3 className='mb-4 font-bold'>Item Laundry</h3>
      <div className='space-y-4'>
        {items?.map((item) => (
          <div key={item.id} className='flex items-center justify-between'>
            <div>
              <p className='font-medium'>{item.laundry_item.name}</p>
              <p className='text-xs text-slate-500'>{item.qty} pcs</p>
            </div>
          </div>
        ))}
        {(!items || items.length === 0) && (
          <p className='text-sm text-slate-500'>
            Detail item belum tersedia (Proses di Outlet)
          </p>
        )}
      </div>
    </div>
  );
}
