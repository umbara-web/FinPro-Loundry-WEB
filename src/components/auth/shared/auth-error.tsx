interface AuthErrorProps {
  error: string | null;
}

export function AuthError({ error }: AuthErrorProps) {
  if (!error) return null;

  return (
    <div className='rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400'>
      {error}
    </div>
  );
}
