'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/src/components/ui/button';
import { authApi } from '@/src/lib/api/auth-api';
import { WashingMachine, Mail, CheckCircle } from 'lucide-react';
import { ColourfulText } from '@/src/components/ui/colourful-text';
import FormField from './form-field';
import Link from 'next/link';

const ResendSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
});

export function ResendVerificationForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: ResendSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      try {
        await authApi.resendVerification({ email: values.email });
        setSuccess(true);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error || 'Gagal mengirim email verifikasi.';
        setError(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (success) {
    return (
      <div className='w-full space-y-6 text-center'>
        <div className='flex justify-center'>
          <div className='rounded-full bg-green-100 p-4 dark:bg-green-900/30'>
            <CheckCircle className='h-12 w-12 text-green-600 dark:text-green-400' />
          </div>
        </div>
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Email Terkirim!
          </h1>
          <p className='text-gray-500 dark:text-gray-400'>
            Kami telah mengirim ulang email verifikasi. Silakan cek inbox Anda.
          </p>
        </div>
        <Link href='/auth/login'>
          <Button className='w-full bg-blue-600 text-white hover:bg-blue-700'>
            Kembali ke Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <div className='flex items-center gap-1'>
          <div className='text-primary dark:text-background-light flex size-10 items-center justify-center rounded-xl bg-transparent'>
            <WashingMachine className='h-6 w-6' />
          </div>
          <h2 className='text-primary text-xl font-bold tracking-tight dark:text-white'>
            <ColourfulText text='FreshLaundry' />
          </h2>
        </div>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Kirim Ulang Verifikasi
        </h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Masukkan email Anda untuk menerima email verifikasi baru
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        {error && (
          <div className='rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400'>
            {error}
          </div>
        )}

        <FormField
          id='email'
          label='Email'
          type='email'
          placeholder='Masukkan email Anda'
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />

        <Button
          type='submit'
          className='w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700/50'
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Mengirim...' : 'Kirim Email Verifikasi'}
        </Button>
      </form>

      <div className='text-center text-sm text-gray-500 dark:text-gray-400'>
        Sudah memiliki akun terverifikasi?{' '}
        <Link
          href='/auth/login'
          className='font-semibold text-blue-600 hover:underline dark:text-blue-400'
        >
          Login
        </Link>
      </div>
    </div>
  );
}
