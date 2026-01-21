'use client';

import RegisterForm from '@/src/components/auth/register-form';
import { AuthLayout } from '@/src/components/auth/auth-layout';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
