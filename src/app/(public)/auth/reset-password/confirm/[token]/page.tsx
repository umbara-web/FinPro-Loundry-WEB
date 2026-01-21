'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authApi } from '@/src/lib/api/auth-api';
import { AuthLayout } from '@/src/components/auth/auth-layout';
import { AuthHeader } from '@/src/components/auth/shared/auth-header';
import { AuthError } from '@/src/components/auth/shared/auth-error';
import { AuthSubmitButton } from '@/src/components/auth/shared/auth-submit-button';
import { PasswordFields } from '@/src/components/auth/password-field';
import {
  SuccessResetView,
  InvalidTokenView,
} from '@/src/components/auth/Reset-password-views';
import { FormContentProps } from '@/src/types/reset-password';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <ResetPasswordContent />
      </Suspense>
    </AuthLayout>
  );
}

function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
    </div>
  );
}

function ResetPasswordContent() {
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => router.push('/auth/login'), 3000);
  };

  if (!token) return <InvalidTokenView />;
  if (success) return <SuccessResetView />;
  return <ResetPasswordForm token={token} onSuccess={handleSuccess} />;
}

function ResetPasswordForm({
  token,
  onSuccess,
}: {
  token: string;
  onSuccess: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      try {
        await authApi.resetPassword({ token, password: values.password });
        onSuccess();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to reset password.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='w-full space-y-6'>
      <AuthHeader
        title='Reset Password'
        description='Enter your new password below.'
      />
      <FormContent
        formik={formik}
        error={error}
        showPwd={showPwd}
        showConfirm={showConfirm}
        setShowPwd={setShowPwd}
        setShowConfirm={setShowConfirm}
      />
    </div>
  );
}

function FormContent({
  formik,
  error,
  showPwd,
  showConfirm,
  setShowPwd,
  setShowConfirm,
}: FormContentProps) {
  return (
    <form onSubmit={formik.handleSubmit} className='space-y-4'>
      <AuthError error={error} />
      <PasswordFields
        formik={formik}
        showPwd={showPwd}
        showConfirm={showConfirm}
        setShowPwd={setShowPwd}
        setShowConfirm={setShowConfirm}
      />
      <AuthSubmitButton
        isSubmitting={formik.isSubmitting}
        text='Reset Password'
        loadingText='Resetting...'
      />
    </form>
  );
}
