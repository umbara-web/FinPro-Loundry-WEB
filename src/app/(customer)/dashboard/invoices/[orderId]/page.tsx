'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrderDetail } from '@/src/lib/api/order-api';
import { authApi } from '@/src/lib/api/auth-api';
import { Order } from '@/src/types/order';
import {
  formatCurrency,
  formatDate,
} from '@/src/components/dashboard/payment/payment-history/payment-table-formatters';
import { FaArrowLeft, FaCloudDownloadAlt } from 'react-icons/fa';
import { MdPrint } from 'react-icons/md';
import { LuWashingMachine } from 'react-icons/lu';

export default function InvoicePage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);

  const { data: order, isLoading: isOrderLoading } = useQuery({
    queryKey: ['order-invoice', orderId],
    queryFn: () => getOrderDetail(orderId),
  });

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => authApi.getMe(),
  });

  if (isOrderLoading || isUserLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-slate-50'>
        <div className='text-slate-500'>Memuat Invoice...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-slate-50'>
        <div className='text-red-500'>Invoice tidak ditemukan</div>
      </div>
    );
  }

  // Type assertion since getOrderDetail returns a constructed object that might not perfectly match Order type in all strictness,
  // but we know the structure from api file.
  const orderData = order as unknown as Order;
  const userData = user?.data || {}; // Adjust based on actual API response structure for 'user'

  const invoiceNumber = `#INV-${new Date(orderData.created_at || new Date()).getFullYear()}-${orderData.order_id?.slice(0, 4).toUpperCase() || 'XXXX'}`;
  const isPaid =
    orderData.status === 'PAID' || orderData.status === 'COMPLETED'; // Adjust based on your status logic
  const paymentMethod = orderData.payment?.[0]?.method || 'Belum dipilih';

  // Calculate items total
  const itemsTotal =
    orderData.order_item?.reduce((sum, item) => {
      return sum + (item.price || 0) * item.qty;
    }, 0) || 0;

  // Assuming delivery fee is fixed or calculated. If not in order object, use placeholder or 0.
  // The provided HTML shows "Biaya Pengiriman". Let's check if order has it.
  // API doesn't seem to return it explicitly in Order interface, but maybe it's part of price_total calculation.
  // For now, I'll calculate it as price_total - itemsTotal if possible, or just use 0 if itemsTotal == price_total.
  const deliveryFee = Math.max(0, (orderData.price_total || 0) - itemsTotal);

  return (
    <div className='bg-background-light dark:bg-background-dark font-display h-full w-full overflow-y-auto pb-20 text-slate-900'>
      {/* Header / Toolbar */}
      <div className='no-print bg-background-light dark:bg-background-dark sticky top-0 z-50 border-b border-slate-200 backdrop-blur-md'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => window.close()}
              className='rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-600'
            >
              <FaArrowLeft className='text-primary h-6 w-6 cursor-pointer dark:text-white' />
            </button>
            <h1 className='text-lg font-bold dark:text-white'>
              Invoice Digital
            </h1>
          </div>
          <div className='flex gap-3'>
            <button
              className='flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600'
              onClick={() => window.print()}
            >
              <MdPrint className='h-6 w-6 cursor-pointer text-white' />
              Cetak
            </button>
            {/* Download PDF button can just trigger print for now or be hidden if no PDF generation lib */}
            <button
              onClick={() => window.print()}
              className='hover:bg-primary/80 shadow-primary/20 bg-primary dark:hover:text-primary flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-md transition-all dark:bg-white dark:text-black dark:hover:bg-white/80'
            >
              <FaCloudDownloadAlt className='h-6 w-6 cursor-pointer text-white dark:text-black' />
              Unduh PDF
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <main className='mx-auto mt-8 max-w-6xl px-4 sm:px-6'>
        <div className='invoice-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl'>
          <div className='border-b border-slate-100 bg-slate-50/50 p-8 sm:p-12'>
            <div className='flex flex-col justify-between gap-8 md:flex-row'>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <div className=''>
                    <LuWashingMachine className='text-primary h-6 w-6 cursor-pointer' />
                  </div>
                  <span className='text-2xl font-bold tracking-tight'>
                    Fresh<span className='text-primary'>Laundry</span>
                  </span>
                </div>
                <div className='text-sm leading-relaxed text-slate-500'>
                  <p className='font-semibold text-slate-800'>
                    PT. Fresh Laundry Indonesia
                  </p>
                  <p>Jl. Kebayoran Baru No. 12, Jakarta Selatan</p>
                  <p>Telepon: (021) 555-0123</p>
                  <p>Email: admin@freshlaundry.com</p>
                </div>
              </div>
              <div className='space-y-1 text-left md:text-right'>
                <h2 className='text-3xl font-black tracking-tight text-slate-800 uppercase'>
                  INVOICE
                </h2>
                <p className='text-primary text-lg font-bold'>
                  {invoiceNumber}
                </p>
                <div className='space-y-1 pt-4'>
                  <p className='text-xs font-bold tracking-widest text-slate-400 uppercase'>
                    Status Pembayaran
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                      isPaid
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isPaid ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                    ></span>
                    {isPaid ? 'LUNAS' : 'BELUM LUNAS'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-between gap-12 p-8 sm:p-12 md:grid-cols-2'>
            <div>
              <h3 className='mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase'>
                Ditagihkan Ke:
              </h3>
              <div className='space-y-1'>
                <p className='text-lg font-bold'>
                  {orderData.pickup_request?.customer_address?.recipient_name ||
                    userData.name ||
                    'Pelanggan'}
                </p>
                <p className='text-sm text-slate-600'>
                  {userData.email || '-'}
                </p>
                <p className='text-sm text-slate-600'>
                  {orderData.pickup_request?.customer_address
                    ?.recipient_phone ||
                    userData.phone ||
                    '-'}
                </p>
              </div>
            </div>
            <div>
              <h3 className='mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase'>
                Alamat Pengiriman:
              </h3>
              <p className='text-sm leading-relaxed text-slate-600'>
                {orderData.pickup_request?.customer_address?.address}
                <br />
                {orderData.pickup_request?.customer_address?.city},{' '}
                {orderData.pickup_request?.customer_address?.postal_code}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 border-y border-slate-100 bg-slate-50 px-8 py-4 sm:px-12 md:grid-cols-4'>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase'>
                Tanggal Invoice
              </p>
              <p className='text-sm font-semibold'>
                {formatDate(orderData.created_at)}
              </p>
            </div>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase'>
                Metode Pembayaran
              </p>
              <p className='text-sm font-semibold uppercase'>{paymentMethod}</p>
            </div>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase'>
                Layanan
              </p>
              <p className='text-sm font-semibold'>Regular</p>
            </div>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase'>
                Estimasi Selesai
              </p>
              {/* Calculating estimate: created_at + 2 days for example, or simply '-' if not available */}
              <p className='text-sm font-semibold'>
                {orderData.created_at
                  ? (() => {
                      const d = new Date(orderData.created_at);
                      d.setDate(d.getDate() + 2); // Mock 2 days estimate
                      return formatDate(d.toISOString());
                    })()
                  : '-'}
              </p>
            </div>
          </div>

          <div className='p-8 sm:p-12'>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse text-left'>
                <thead>
                  <tr className='border-b-2 border-slate-100'>
                    <th className='py-4 text-xs font-bold tracking-widest text-slate-400 uppercase'>
                      Item / Deskripsi
                    </th>
                    <th className='py-4 text-center text-xs font-bold tracking-widest text-slate-400 uppercase'>
                      Jumlah
                    </th>
                    <th className='py-4 text-right text-xs font-bold tracking-widest text-slate-400 uppercase'>
                      Harga Satuan
                    </th>
                    <th className='py-4 text-right text-xs font-bold tracking-widest text-slate-400 uppercase'>
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-50'>
                  {orderData.order_item?.map((item, idx) => (
                    <tr key={idx}>
                      <td className='py-6'>
                        <p className='font-bold text-slate-800'>
                          {item.itemName || item.laundry_item?.name || 'Item'}
                        </p>
                        <p className='text-xs text-slate-500'>
                          Layanan Laundry
                        </p>
                      </td>
                      <td className='py-6 text-center text-slate-700'>
                        {item.qty}
                      </td>
                      <td className='py-6 text-right text-slate-700'>
                        {formatCurrency(item.price || 0)}
                      </td>
                      <td className='py-6 text-right font-semibold'>
                        {formatCurrency((item.price || 0) * item.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='px-8 pb-12 sm:px-12'>
            <div className='flex flex-col items-start justify-between gap-8 md:flex-row'>
              <div className='flex flex-col items-center gap-6 rounded-xl border border-slate-100 bg-slate-50 p-6 sm:flex-row'>
                <div className='rounded-lg border border-slate-200 bg-white p-2 shadow-sm'>
                  {/* Using a placeholder QR code or generated one */}
                  <img
                    alt='QR Code Tracking'
                    className='h-[100px] w-[100px]'
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderData.id}`}
                  />
                </div>
                <div className='text-center sm:text-left'>
                  <p className='text-primary mb-1 text-xs font-bold tracking-widest uppercase'>
                    Scan untuk Lacak Pesanan
                  </p>
                  <p className='max-w-[180px] text-[11px] text-slate-500'>
                    Gunakan kamera ponsel Anda untuk melihat status pengerjaan
                    laundry secara real-time.
                  </p>
                </div>
              </div>
              <div className='w-full space-y-3 md:w-80'>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-500'>Total Harga Item</span>
                  <span className='font-medium'>
                    {formatCurrency(itemsTotal)}
                  </span>
                </div>
                {/* 
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Diskon (Promo Akhir Bulan)</span>
                    <span className="font-medium text-red-500">- Rp 0</span>
                </div>
                */}
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-500'>Biaya Pengiriman</span>
                  <span className='font-medium'>
                    {formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div className='flex items-end justify-between border-t border-slate-200 pt-3'>
                  <span className='text-lg font-bold text-slate-800'>
                    Grand Total
                  </span>
                  <span className='text-primary text-2xl font-black'>
                    {formatCurrency(orderData.price_total || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='border-t border-slate-100 bg-slate-50 p-8 text-center'>
            <p className='text-sm text-slate-400'>
              Terima kasih telah mempercayakan pakaian Anda kepada{' '}
              <span className='font-bold text-slate-600'>LaundryPro</span>
            </p>
            <p className='mt-1 text-xs text-slate-400'>
              Invoice ini dihasilkan secara otomatis dan merupakan bukti
              pembayaran yang sah.
            </p>
          </div>
        </div>
        {/* Footer links */}
        {/* Hidden in print */}
        <div className='no-print mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row'>
          <a
            href='#'
            className='text-primary flex items-center gap-2 text-sm font-bold hover:underline'
            onClick={(e) => {
              e.preventDefault();
              alert('Silahkan hubungi CS kami di (021) 555-0123');
            }}
          >
            <span className='material-icons text-base'>help_outline</span>
            Punya pertanyaan tentang invoice ini?
          </a>
        </div>
      </main>
    </div>
  );
}
