'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { authApi } from '@/src/lib/api/auth-api';
import SocialLoginButtons from './social-login-buttons';
import FormDivider from './form-divider';
import SuccessMessage from './success-message';
import FormField from './form-field';
import { AuthHeader } from './shared/auth-header';
import { AuthError } from './shared/auth-error';
import { AuthSubmitButton } from './shared/auth-submit-button';
import { AuthFooter } from './shared/auth-footer';
import FormFooter from './form-footer';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must be digits only')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
});

async function handleRegister(values: any, setError: any, setSuccess: any) {
  try {
    await authApi.register(values);
    setSuccess(true);
  } catch (err: any) {
    setError(
      err.response?.data?.error || 'Registration failed. Please try again.'
    );
  }
}

export default function RegisterForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { name: '', email: '', phone: '' },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      await handleRegister(values, setError, setSuccess);
      setSubmitting(false);
    },
  });

  if (success) return <SuccessMessage email={formik.values.email} />;

  return (
    <div className='w-full space-y-6'>
      <AuthHeader
        title='Daftar Akun'
        description='Masukkan detail Anda di bawah untuk membuat akun Anda'
      />

      <SocialLoginButtons />
      <FormDivider />

      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        <AuthError error={error} />

        <FormField
          id='name'
          label='Nama Lengkap'
          placeholder='Nama Lengkap'
          value={formik.values.name}
          error={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='email'
          label='Email'
          type='email'
          placeholder='Email'
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormField
          id='phone'
          label='Nomor Telepon'
          type='tel'
          placeholder='Nomor Telepon'
          value={formik.values.phone}
          error={formik.errors.phone}
          touched={formik.touched.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <AuthSubmitButton
          isSubmitting={formik.isSubmitting}
          text='Buat Akun'
          loadingText='Membuat Akun...'
        />
      </form>

      <AuthFooter
        text='Sudah Punya Akun?'
        linkText='Masuk'
        linkHref='/auth/login'
      />

      <FormFooter />
    </div>
  );
}
