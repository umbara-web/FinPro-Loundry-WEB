'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, LocateFixed, X } from 'lucide-react';
import { useLocationPermission } from '../Location/use-location-permission';

export function LocationPermissionModal() {
  const {
    isOpen,
    isLoading,
    permissionError,
    handleAllow,
    handleDismiss,
    handleRefresh,
  } = useLocationPermission();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-100 bg-black/60 backdrop-blur-sm'
            onClick={permissionError ? undefined : handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='fixed top-1/2 left-1/2 z-100 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2'
          >
            <div className='overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900'>
              {/* Blue Header */}
              <div
                className={`${permissionError ? 'bg-linear-to-br from-red-500 to-red-600' : 'bg-linear-to-br from-blue-400 to-blue-600'} flex items-center justify-center p-8 transition-colors duration-300`}
              >
                <div className='rounded-full bg-white p-4 shadow-lg'>
                  {permissionError ? (
                    <X className='h-8 w-8 text-red-500' />
                  ) : (
                    <MapPin className='h-8 w-8 text-blue-500' />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className='p-6 text-center'>
                <h2 className='mb-3 text-xl font-bold text-gray-900 dark:text-white'>
                  {permissionError
                    ? 'Gagal Mengambil Lokasi'
                    : 'Izinkan Akses Lokasi?'}
                </h2>
                <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
                  {permissionError
                    ? 'Terjadi kesalahan saat mengakses lokasi Anda. Silakan refresh halaman untuk mencoba lagi.'
                    : 'FreshLaundry membutuhkan lokasi Anda untuk menemukan outlet terdekat dan memberikan estimasi biaya antar-jemput yang akurat.'}
                </p>

                {/* Buttons */}
                <div className='space-y-3'>
                  {permissionError ? (
                    <button
                      onClick={handleRefresh}
                      className='flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 font-semibold text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                    >
                      OK (Refresh Halaman)
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleAllow}
                        disabled={isLoading}
                        className='flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                      >
                        <LocateFixed className='h-5 w-5' />
                        {isLoading ? 'Meminta izin...' : 'Izinkan Lokasi'}
                      </button>
                      <button
                        onClick={handleDismiss}
                        className='h-12 w-full rounded-xl bg-gray-100 font-semibold text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      >
                        Nanti Saja
                      </button>
                    </>
                  )}
                </div>

                {/* Privacy Link */}
                {!permissionError && (
                  <p className='mt-6 text-xs text-gray-400 dark:text-gray-500'>
                    Kami menjaga privasi lokasi Anda sesuai dengan{' '}
                    <a
                      href='/privacy'
                      className='underline hover:text-gray-600 dark:hover:text-gray-300'
                    >
                      Kebijakan Privasi
                    </a>{' '}
                    kami.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
