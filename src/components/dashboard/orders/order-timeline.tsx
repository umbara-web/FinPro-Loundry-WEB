import { format, isValid, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { FaCheckCircle, FaRoute } from 'react-icons/fa';

interface OrderTimelineProps {
  status: string;
  updatedAt: string;
  createdAt: string;
}

// Helper to safely format dates
function formatDate(dateString: string): string {
  if (!dateString) return '-';
  try {
    const date =
      typeof dateString === 'string'
        ? parseISO(dateString)
        : new Date(dateString);
    if (!isValid(date)) return '-';
    return format(date, 'dd MMM, HH:mm', { locale: id });
  } catch {
    return '-';
  }
}

const STEPS = [
  {
    key: 'CREATED',
    label: 'Pesanan Dibuat',
    desc: 'Sistem telah menerima pesanan Anda',
    statuses: ['CREATED', 'WAITING_DRIVER', 'DRIVER_ASSIGNED'],
  },
  {
    key: 'PICKED_UP',
    label: 'Penjemputan',
    desc: 'Driver menjemput / Item tiba di outlet',
    statuses: ['PICKED_UP', 'ARRIVED_OUTLET', 'WAITING_PAYMENT'],
  },
  {
    key: 'PROCESSING',
    label: 'Proses Laundry',
    desc: 'Sedang dicuci, disetrika, atau dikemas',
    statuses: ['PAID', 'IN_WASHING', 'IN_IRONING', 'IN_PACKING'],
  },
  {
    key: 'DELIVERY',
    label: 'Pengiriman',
    desc: 'Pesanan siap atau sedang diantar',
    statuses: ['READY_FOR_DELIVERY', 'ON_DELIVERY'],
  },
  {
    key: 'COMPLETED',
    label: 'Selesai',
    desc: 'Pesanan telah diterima pelanggan',
    statuses: ['DELIVERED', 'COMPLETED'],
  },
];

export function OrderTimeline({
  status,
  updatedAt,
  createdAt,
}: OrderTimelineProps) {
  // Determine current step index
  let currentStepIndex = 0;
  const currentStatusIndex = STEPS.findIndex((step) =>
    step.statuses.includes(status)
  );

  if (currentStatusIndex !== -1) {
    currentStepIndex = currentStatusIndex;
  } else if (status === 'CANCELLED') {
    currentStepIndex = -1; // Special case
  }

  return (
    <div className='border-border rounded-2xl border bg-slate-200 p-8 dark:border-slate-700 dark:bg-slate-900'>
      <div className='mb-8 flex items-center gap-3'>
        <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
          <FaRoute className='h-6 w-6' />
        </div>
        <h3 className='text-lg font-bold'>Riwayat Proses</h3>
      </div>

      <div className="before:bg-border relative space-y-10 pl-8 before:absolute before:top-2 before:bottom-2 before:left-3 before:w-0.5 before:content-['']">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isFuture = index > currentStepIndex;

          return (
            <div
              key={step.key}
              className={`relative ${isFuture ? 'opacity-40' : ''}`}
            >
              {/* Icon */}
              <div
                className={`border-background absolute top-1 -left-8 z-10 flex size-6 items-center justify-center rounded-full border-4 ${
                  isCompleted || isCurrent ? 'bg-blue-500' : 'bg-blue-500/20'
                }`}
              >
                {isCurrent ? (
                  <div className='size-2 animate-pulse rounded-full bg-blue-500'></div>
                ) : isCompleted ? (
                  <FaCheckCircle className='text-white' />
                ) : (
                  <div className='size-2 rounded-full bg-blue-500'></div>
                )}
              </div>

              {/* Content */}
              <div>
                <p
                  className={`text-sm font-bold ${isFuture ? 'text-muted-foreground' : ''}`}
                >
                  {step.label}
                </p>
                <p className='text-muted-foreground mt-0.5 text-xs'>
                  {step.desc}
                </p>
                {isCurrent && (
                  <p className='text-primary mt-1 text-xs font-medium'>
                    {formatDate(updatedAt)}
                  </p>
                )}
                {index === 0 && !isCurrent && (
                  <p className='text-muted-foreground mt-1 text-xs font-medium'>
                    {formatDate(createdAt)}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {status === 'CANCELLED' && (
          <div className='relative'>
            <div className='border-background bg-destructive absolute top-1 -left-8 z-10 flex size-6 items-center justify-center rounded-full border-4'>
              <span className='material-symbols-outlined text-sm font-bold text-white'>
                close
              </span>
            </div>
            <div>
              <p className='text-destructive text-sm font-bold'>Dibatalkan</p>
              <p className='text-muted-foreground mt-0.5 text-xs'>
                Pesanan ini telah dibatalkan
              </p>
              <p className='text-destructive mt-1 text-[10px] font-medium'>
                {formatDate(updatedAt)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
