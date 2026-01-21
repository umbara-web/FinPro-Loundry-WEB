'use client';

import Link from 'next/link';

export default function FormFooter() {
  return (
    <>
      <p className='px-8 text-center text-xs text-gray-500 dark:text-gray-400'>
        Dengan klik lanjut, Anda setuju dengan{' '}
        <Link
          href='#'
          className='underline underline-offset-4 hover:text-blue-500 dark:text-white dark:hover:text-blue-500'
        >
          Syarat dan Ketentuan
        </Link>{' '}
        dan{' '}
        <Link
          href='#'
          className='underline underline-offset-4 hover:text-blue-500 dark:text-white dark:hover:text-blue-500'
        >
          Kebijakan Privasi
        </Link>
        .
      </p>
    </>
  );
}
