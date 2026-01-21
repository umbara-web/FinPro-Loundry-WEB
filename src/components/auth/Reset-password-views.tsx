'use client';

import Link from 'next/link';

export function SuccessResetView() {
  return (
    <div className='text-center'>
      <SuccessIcon />
      <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
        Password Reset Successfully!
      </h2>
      <p className='mt-2 text-gray-500 dark:text-gray-400'>
        Your password has been updated.
      </p>
      <p className='mt-4 text-sm text-blue-500'>Redirecting to login...</p>
    </div>
  );
}

function SuccessIcon() {
  return (
    <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
      <svg
        className='h-6 w-6 text-green-600 dark:text-green-400'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 13l4 4L19 7'
        />
      </svg>
    </div>
  );
}

export function InvalidTokenView() {
  return (
    <div className='text-center'>
      <ErrorIcon />
      <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
        Invalid Link
      </h2>
      <p className='mt-2 text-gray-500 dark:text-gray-400'>
        The reset password link is invalid or missing.
      </p>
      <div className='mt-4'>
        <Link
          href='/auth/reset-password/request'
          className='text-blue-500 hover:underline'
        >
          Request a new link
        </Link>
      </div>
    </div>
  );
}

function ErrorIcon() {
  return (
    <div className='mb-4 flex justify-center text-red-500'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='12' cy='12' r='10'></circle>
        <line x1='12' y1='8' x2='12' y2='12'></line>
        <line x1='12' y1='16' x2='12.01' y2='16'></line>
      </svg>
    </div>
  );
}
