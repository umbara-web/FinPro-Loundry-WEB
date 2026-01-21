import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled,
}: FormFieldProps) {
  const hasError = touched && error;

  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={hasError ? 'border-red-500 focus-visible:ring-red-500' : ''}
      />
      {hasError && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}
