import { HelpCircle, ArrowRight } from 'lucide-react';

export function ContactFAQ() {
  return (
    <div className='border-primary/20 bg-primary/5 flex items-start gap-4 rounded-xl border p-6 dark:border-slate-800 dark:bg-slate-900'>
      <div className='bg-primary/10 text-primary shrink-0 rounded-full p-2 dark:bg-slate-700 dark:text-white'>
        <HelpCircle />
      </div>
      <div>
        <h4 className='mb-1 text-base font-bold text-slate-900 dark:text-white'>
          Ada pertanyaan singkat?
        </h4>
        <p className='mb-3 text-sm text-slate-600 dark:text-slate-400'>
          Kunjungi Pusat Bantuan kami untuk mendapatkan jawaban langsung atas
          pertanyaan umum Anda. Kami akan memberikan informasi tentang harga dan
          pengiriman.
        </p>
        <a
          href='#'
          className='text-primary inline-flex items-center gap-1 text-sm font-bold transition-colors hover:text-blue-500 dark:text-white dark:hover:text-blue-500'
        >
          Kunjungi Pusat Bantuan
          <ArrowRight className='text-sm' />
        </a>
      </div>
    </div>
  );
}
