import { OrderItem } from '@/src/types/order';
import { formatCurrency } from '@/src/lib/utils/format';
import { FaShoppingCart, FaShopify } from 'react-icons/fa';

interface OrderItemsListProps {
  items: OrderItem[];
}

export function OrderItemsList({ items }: OrderItemsListProps) {
  // Calculate total items count
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className='border-border space-y-6 rounded-xl border bg-slate-200 p-8 dark:border-slate-700 dark:bg-slate-900'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
            <FaShoppingCart className='h-6 w-6' />
          </div>
          <h3 className='text-lg font-bold'>Daftar Item Pakaian</h3>
        </div>
        <span className='rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-500'>
          {totalItems} Item Total
        </span>
      </div>

      <div className='border-border overflow-hidden rounded-2xl border bg-slate-200 shadow-sm dark:border-slate-700 dark:bg-slate-800'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-border border-b bg-slate-200 dark:bg-slate-950'>
              <th className='text-muted-foreground px-6 py-4 text-xs font-bold tracking-widest uppercase'>
                Pakaian / Layanan
              </th>
              <th className='text-muted-foreground px-6 py-4 text-center text-xs font-bold tracking-widest uppercase'>
                Jumlah
              </th>
              {/* <th className='text-muted-foreground px-6 py-4 text-right text-xs font-bold tracking-widest uppercase'>
                Harga Satuan
              </th>
              <th className='text-muted-foreground px-6 py-4 text-right text-xs font-bold tracking-widest uppercase'>
                Subtotal
              </th> */}
            </tr>
          </thead>
          <tbody className='divide-border/50 divide-y'>
            {items.map((item) => {
              const unitPrice = item.price || item.laundry_item.price || 0;
              const subtotal = unitPrice * item.qty;

              return (
                <tr
                  key={item.id}
                  className='hover:bg-muted/20 transition-colors'
                >
                  <td className='px-6 py-5'>
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
                        <FaShopify className='h-5 w-5' />
                      </div>
                      <div>
                        <p className='font-semibold'>
                          {item.laundry_item.name}
                        </p>
                        <p className='text-muted-foreground text-xs'>
                          Layanan: Regular
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-5 text-center text-sm font-medium'>
                    {item.qty}
                  </td>
                  {/* <td className='text-muted-foreground px-6 py-5 text-right text-sm'>
                    {unitPrice > 0 ? formatCurrency(unitPrice) : '-'}
                  </td>
                  <td className='px-6 py-5 text-right text-sm font-bold'>
                    {subtotal > 0 ? formatCurrency(subtotal) : '-'}
                  </td> */}
                </tr>
              );
            })}
            {(!items || items.length === 0) && (
              <tr>
                <td
                  colSpan={4}
                  className='text-muted-foreground px-6 py-5 text-center text-sm'
                >
                  Detail item belum tersedia (Proses di Outlet)
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
