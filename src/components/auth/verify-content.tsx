'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/src/components/ui/button';
import { authApi } from '@/src/lib/api/auth-api';
import { WashingMachine } from 'lucide-react';
import ColourfulText from '@/src/components/ui/colourful-text';
import { VerifyInvalidToken, VerifySuccess } from './verify-status';
import { PasswordField } from './password-field';
import { AuthLogo } from './shared/auth-logo';

const VerifySchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Token validation happens in form submission
  }, [token]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: VerifySchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      if (!token) {
        setError('Invalid or missing token');
        setSubmitting(false);
        return;
      }

      try {
        await authApi.verify({ token, password: values.password });
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } catch (err: any) {
        console.error('Verification error:', err);
        const errorMessage =
          err.response?.data?.error || 'Verification failed. Please try again.';
        setError(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!token) return <VerifyInvalidToken />;
  if (success) return <VerifySuccess />;

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <div className='flex items-center gap-1'>
          <AuthLogo />
        </div>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Atur Kata Sandi
        </h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Verifikasi akun Anda dengan mengatur password yang aman
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        {error && (
          <div className='rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400'>
            {error}
          </div>
        )}

        <div className='space-y-4'>
          <PasswordField
            id='password'
            label='Password'
            placeholder='Masukkan Password'
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <PasswordField
            id='confirmPassword'
            label='Konfirmasi Password'
            placeholder='Konfirmasi Password'
            value={formik.values.confirmPassword}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <Button
          type='submit'
          className='w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700/50'
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Verifying...' : 'Set Password & Verify'}
        </Button>
      </form>
    </div>
  );
}
