import { Button } from '@/src/components/ui/button';

interface AuthSubmitButtonProps {
  isSubmitting: boolean;
  text?: string;
  loadingText?: string;
  className?: string;
}

export function AuthSubmitButton({
  isSubmitting,
  text = 'Submit',
  loadingText = 'Loading...',
  className = '',
}: AuthSubmitButtonProps) {
  return (
    <Button
      type='submit'
      className={`w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700/50 ${className}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? loadingText : text}
    </Button>
  );
}
