import Link from 'next/link';

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
  className?: string;
}

export function AuthFooter({
  text,
  linkText,
  linkHref,
  className = '',
}: AuthFooterProps) {
  return (
    <div
      className={`text-center text-sm text-gray-500 dark:text-gray-400 ${className}`}
    >
      {text}{' '}
      <Link
        href={linkHref}
        className='font-semibold text-black hover:text-blue-500 hover:underline dark:text-white dark:hover:text-blue-500'
      >
        {linkText}
      </Link>
    </div>
  );
}
