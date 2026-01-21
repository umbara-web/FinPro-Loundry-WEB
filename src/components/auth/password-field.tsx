'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

// ============ Single Password Field ============
export interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  // Optional controlled mode
  show?: boolean;
  onToggle?: () => void;
}

export function PasswordField({
  id,
  label,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled,
  placeholder,
  show: controlledShow,
  onToggle,
}: PasswordFieldProps) {
  const [internalShow, setInternalShow] = useState(false);

  // Support both controlled and uncontrolled modes
  const isControlled = controlledShow !== undefined && onToggle !== undefined;
  const showPassword = isControlled ? controlledShow : internalShow;
  const handleToggle = isControlled
    ? onToggle
    : () => setInternalShow(!internalShow);

  const hasError = touched && error;

  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <div className='relative'>
        <Input
          id={id}
          name={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={
            hasError
              ? 'border-red-500 pr-10 focus-visible:ring-red-500'
              : 'pr-10'
          }
        />
        <ToggleButton show={showPassword} onToggle={handleToggle} />
      </div>
      {hasError && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}

// ============ Toggle Button ============
function ToggleButton({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-label={show ? 'Hide password' : 'Show password'}
      className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
    >
      {show ? <Eye size={16} /> : <EyeOff size={16} />}
    </button>
  );
}

// ============ Password Fields (for reset password) ============
export interface PasswordFieldsProps {
  formik: any;
  showPwd: boolean;
  showConfirm: boolean;
  setShowPwd: (v: boolean) => void;
  setShowConfirm: (v: boolean) => void;
}

export function PasswordFields({
  formik,
  showPwd,
  showConfirm,
  setShowPwd,
  setShowConfirm,
}: PasswordFieldsProps) {
  const fields = [
    {
      id: 'password',
      label: 'New Password',
      show: showPwd,
      toggle: () => setShowPwd(!showPwd),
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      show: showConfirm,
      toggle: () => setShowConfirm(!showConfirm),
    },
  ];

  return (
    <div className='space-y-4'>
      {fields.map((f) => (
        <PasswordField
          key={f.id}
          id={f.id}
          label={f.label}
          value={formik.values[f.id]}
          error={formik.errors[f.id]}
          touched={formik.touched[f.id]}
          show={f.show}
          onToggle={f.toggle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />
      ))}
    </div>
  );
}
