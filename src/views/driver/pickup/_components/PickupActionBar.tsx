import { Package, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { PickupStep } from '../_types';

interface PickupActionBarProps {
  isWaitingDriver: boolean;
  updating: boolean;
  currentStep: PickupStep;
  handleAcceptPickup: () => void;
  handleUpdateStatus: () => void;
  getCurrentStepIndex: () => number;
}

export const PickupActionBar = ({
  isWaitingDriver,
  updating,
  currentStep,
  handleAcceptPickup,
  handleUpdateStatus,
  getCurrentStepIndex,
}: PickupActionBarProps) => {
  const getButtonLabel = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex === 0) return 'Pickup Selesai';
    if (currentIndex === 1) return 'Konfirmasi Sampai di Outlet';
    return 'Tugas Selesai';
  };

  return (
    <div className='sticky bottom-0 border-t border-slate-200 bg-white/95 px-4 py-5 backdrop-blur-md md:px-10 dark:border-slate-800 dark:bg-[#101922]/95'>
      <div className='mx-auto max-w-240'>
        {isWaitingDriver ? (
          <button
            onClick={handleAcceptPickup}
            disabled={updating}
            className='flex w-full transform items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-[0_8px_30px_rgb(37,99,235,0.3)] transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 dark:bg-blue-600 dark:shadow-[0_8px_30px_rgb(10,127,245,0.3)] dark:hover:bg-blue-500'
          >
            <Package className='h-6 w-6' />
            {updating ? 'Memproses...' : 'Terima Request'}
          </button>
        ) : (
          <button
            onClick={handleUpdateStatus}
            disabled={updating || currentStep === 'ARRIVED_OUTLET'}
            className={clsx(
              'flex w-full transform items-center justify-center gap-3 rounded-xl py-4 text-lg font-bold text-white transition-all active:scale-[0.98]',
              currentStep === 'ARRIVED_OUTLET'
                ? 'cursor-not-allowed bg-slate-400 opacity-50 dark:bg-slate-600'
                : 'bg-blue-600 shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:bg-blue-700 dark:bg-blue-600 dark:shadow-[0_8px_30px_rgb(10,127,245,0.3)] dark:hover:bg-blue-500'
            )}
          >
            <CheckCircle className='h-6 w-6' />
            {updating ? 'Memproses...' : getButtonLabel()}
          </button>
        )}
      </div>
    </div>
  );
};
