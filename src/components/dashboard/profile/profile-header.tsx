import { useRef } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useWallet } from '@/src/context/WalletContext';
import { getMembershipTier } from '@/src/lib/utils/membership';
import { Camera, SquarePen } from 'lucide-react';

interface ProfileHeaderProps {
  userName?: string;
  profilePictureUrl?: string;
  onAvatarUpload: (file: File) => void;
}

export function ProfileHeader({
  userName,
  profilePictureUrl,
  onAvatarUpload,
}: ProfileHeaderProps) {
  const { user } = useAuth();
  const { points } = useWallet();
  const tier = getMembershipTier(points);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarUpload(file);
    }
  };

  const defaultAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDjcCxOji8hG5tfGfVMwz6Kiu5tmjD5lFfPEtC8xp8HIombkQF6KOv6Cw_aUOk3h5DXfVYWNIsL2hBquzknycjXk1YsZOmGwYTCRysdyUIulWfp6UQCKJY8Ln7A3TSv_YqnRCqqhQrt2FVwRhAeNw_H_XT3rTYUWeCm_n-X1b70sMgkCIujwwHarPZ14OacEYzHIwVO8Ehwl9jdfvwbDEkppqs8J7wNOD5Qt9bqDlxHso2gtDxgeS3kfwm8Or3KRrBTCmHiQvqOcJs';

  return (
    <div className='mb-8 rounded-xl border border-gray-300 bg-slate-200 p-6 md:p-8 dark:border-slate-700 dark:bg-slate-800'>
      <div className='flex flex-col flex-wrap items-start justify-between gap-6 md:flex-row md:items-center'>
        <div className='flex w-full flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left'>
          <div
            className='group relative cursor-pointer'
            onClick={triggerFileInput}
          >
            <div className='relative h-24 w-24 overflow-hidden rounded-full border-4 border-slate-700 bg-slate-100 md:h-32 md:w-32 dark:bg-slate-800'>
              {profilePictureUrl ? (
                <img
                  src={profilePictureUrl}
                  alt={userName}
                  className='h-full w-full object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-blue-100 text-3xl font-bold text-blue-600 md:text-4xl dark:bg-blue-900 dark:text-blue-200'>
                  {userName?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100'>
              <Camera className='text-white' />
            </div>
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              accept='image/jpeg,image/png,image/gif,image/webp'
              onChange={handleFileChange}
            />
          </div>
          <div className='mt-2 flex flex-col gap-1'>
            <h2 className='text-2xl font-bold text-black dark:text-white'>
              {userName?.toUpperCase() || 'GUEST USER'}
            </h2>
            <div className='flex flex-wrap justify-center gap-2 sm:justify-start'>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${tier.colorClass}`}
              >
                {tier.label}
              </span>
            </div>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              Bergabung sejak{' '}
              {user?.created_at
                ? new Intl.DateTimeFormat('id-ID', {
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date(user.created_at))
                : '-'}
            </p>
          </div>
          <div className='mt-4 w-full sm:mt-0 sm:ml-auto sm:w-auto'>
            <button
              onClick={triggerFileInput}
              className='flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-slate-600 sm:w-auto'
            >
              <SquarePen className='h-4.5 w-4.5' />
              <span>Ubah Foto</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
