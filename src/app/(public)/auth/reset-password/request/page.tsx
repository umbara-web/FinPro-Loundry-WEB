'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useState } from 'react';
import { authApi } from '@/src/lib/api/auth-api';
import { AuthLayout } from '@/src/components/auth/auth-layout';
import { AuthHeader } from '@/src/components/auth/shared/auth-header';
import { AuthError } from '@/src/components/auth/shared/auth-error';
import { AuthSubmitButton } from '@/src/components/auth/shared/auth-submit-button';
import FormField from '@/src/components/auth/form-field';

const RequestResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function RequestResetPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: RequestResetSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      try {
        await authApi.requestResetPassword({ email: values.email });
        setSuccess(true);
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            'Failed to send reset email. Please try again.'
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (success) {
    return (
      <AuthLayout>
        <SuccessView email={formik.values.email} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title='Reset Password'
        description="Enter your email and we'll send a reset link."
      />
      <form onSubmit={formik.handleSubmit} className='mt-6 space-y-4'>
        <AuthError error={error} />
        <FormField
          id='email'
          label='Email'
          type='email'
          placeholder='m@example.com'
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <AuthSubmitButton
          isSubmitting={formik.isSubmitting}
          text='Send Reset Link'
          loadingText='Sending...'
        />
        <BackToLoginLink />
      </form>
    </AuthLayout>
  );
}

function SuccessView({ email }: { email: string }) {
  return (
    <div className='mx-auto grid w-full gap-6 text-center'>
      <SuccessIcon />
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
        Check Your Email
      </h1>
      <p className='text-gray-500 dark:text-gray-400'>
        We have sent a password reset link to <strong>{email}</strong>. Please
        check your inbox.
      </p>
      <BackToLoginLink />
    </div>
  );
}

function SuccessIcon() {
  return (
    <div className='mx-auto flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
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

function BackToLoginLink() {
  return (
    <div className='mt-4 text-center text-sm'>
      <Link href='/auth/login' className='text-blue-500 hover:underline'>
        Back to Login
      </Link>
    </div>
  );
}
