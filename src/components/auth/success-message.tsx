interface SuccessMessageProps {
  email: string;
}

export default function SuccessMessage({ email }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
        <svg
          className="h-8 w-8 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        Check your email
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        We&apos;ve sent a verification link to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {email}
        </span>
        . Please verify your email to set your password.
      </p>
    </div>
  );
}
