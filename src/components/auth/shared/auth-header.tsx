import { AuthLogo } from './auth-logo';

interface AuthHeaderProps {
  title: string;
  description: string;
  showLogo?: boolean;
}

export function AuthHeader({
  title,
  description,
  showLogo = true,
}: AuthHeaderProps) {
  return (
    <div className='flex flex-col items-center gap-2 text-center'>
      {showLogo && <AuthLogo />}
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {title}
      </h1>
      <p className='text-sm text-gray-500 dark:text-gray-400'>{description}</p>
    </div>
  );
}
