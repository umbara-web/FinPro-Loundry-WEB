import { CheckCircle, Package, Navigation } from 'lucide-react';
import { DeliveryDetail, DeliveryStep } from '../_types';
import { steps } from './DeliveryProgress';

interface DeliveryActionsProps {
  currentStep: DeliveryStep;
  delivery: DeliveryDetail;
  onUpdateStatus: (step: DeliveryStep) => Promise<void>;
  updating: boolean;
  router: any;
}

export function DeliveryActions({
  currentStep,
  delivery,
  onUpdateStatus,
  updating,
  router,
}: DeliveryActionsProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex((s) => s.key === currentStep);
  };

  const getButtonLabel = () => {
    return 'Drop Off Selesai';
  };

  const handleUpdate = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex >= steps.length - 1) {
      onUpdateStatus('DONE');
      return;
    }
    const nextStep = steps[currentIndex + 1].key;
    onUpdateStatus(nextStep);
  };

  return (
    <div className='sticky bottom-0 border-t border-slate-200 bg-white/95 px-4 py-5 backdrop-blur-md md:px-10 dark:border-slate-800 dark:bg-[#101922]/95'>
      <div className='mx-auto max-w-240'>
        {currentStep === 'DONE' ? (
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 dark:border-green-500/20 dark:bg-green-500/10'>
              <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />
              <span className='text-sm font-bold text-green-600 dark:text-green-400'>
                Pengiriman Berhasil!
              </span>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => router.push('/driver-dashboard')}
                className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98] dark:bg-blue-600 dark:hover:bg-blue-500'
              >
                <Package className='h-5 w-5' />
                Ambil Tugas Baru
              </button>
              <a
                href={
                  delivery?.order?.pickup_request?.outlet
                    ? `https://www.google.com/maps/dir/?api=1&destination=${delivery.order.pickup_request.outlet.lat},${delivery.order.pickup_request.outlet.long}`
                    : '/driver-dashboard'
                }
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-3.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-200 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
              >
                <Navigation className='h-5 w-5' />
                Kembali ke Outlet
              </a>
            </div>
          </div>
        ) : (
          <button
            onClick={handleUpdate}
            disabled={updating}
            className='flex w-full transform items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500'
          >
            <CheckCircle className='h-6 w-6' />
            {updating ? 'Memproses...' : getButtonLabel()}
          </button>
        )}
      </div>
    </div>
  );
}
