'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import SocialLoginButtons from './social-login-buttons';
import FormDivider from './form-divider';
import FormField from './form-field';
import { useSearchParams } from 'next/navigation';
import { Checkbox } from '@/src/components/ui/checkbox';
import { useAuth } from '@/src/context/AuthContext';
import { AuthHeader } from './shared/auth-header';
import { AuthError } from './shared/auth-error';
import { AuthSubmitButton } from './shared/auth-submit-button';
import { AuthFooter } from './shared/auth-footer';
import FormFooter from './form-footer';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: { email: '', password: '', rememberMe: false },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      try {
        await login({ email: values.email, password: values.password });
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            err.message ||
            'Invalid email or password'
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='flex flex-col gap-6'>
      <AuthHeader
        title='Selamat Datang'
        description='Masukkan email Anda untuk masuk ke akun Anda'
      />

      <SocialLoginButtons />
      <FormDivider />

      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        <AuthError error={error} />

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
          disabled={formik.isSubmitting}
        />

        <div className='relative'>
          <FormField
            id='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute top-7.5 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            aria-label={showPassword ? 'Show password' : 'Hide password'}
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='rememberMe'
              checked={formik.values.rememberMe}
              onCheckedChange={(checked) =>
                formik.setFieldValue('rememberMe', checked)
              }
            />
            <label
              htmlFor='rememberMe'
              className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300'
            >
              Ingatkan Saya
            </label>
          </div>
          <a
            href='/auth/reset-password/request'
            className='text-sm text-blue-600 hover:text-blue-500 hover:underline dark:text-blue-400'
          >
            Lupa Password?
          </a>
        </div>

        <AuthSubmitButton
          isSubmitting={formik.isSubmitting}
          text='Masuk'
          loadingText='Sedang Masuk...'
        />
      </form>

      <AuthFooter
        text='Belum Punya Akun?'
        linkText='Daftar'
        linkHref='/auth/register'
      />

      <FormFooter />
    </div>
  );
}
