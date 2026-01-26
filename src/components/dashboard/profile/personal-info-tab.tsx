import { CheckCircle } from 'lucide-react';
import ProfileDatePicker from './profile-date-picker';

interface PersonalInfoTabProps {
  profileData: {
    name: string;
    email: string;
    phone: string;
    birthDate?: Date;
  };
  isVerified?: boolean;
  onProfileDataChange: (data: any) => void;
  onResendVerification: () => void;
}

export function PersonalInfoTab({
  profileData,
  isVerified,
  onProfileDataChange,
  onResendVerification,
}: PersonalInfoTabProps) {
  return (
    <section id='personal-info'>
      <h3 className='mb-4 flex items-center gap-2 text-lg font-bold text-black dark:text-white'>
        <span className='block h-6 w-1 rounded-full bg-blue-600' />
        Informasi Dasar
      </h3>
      <div className='rounded-xl border border-slate-300 bg-slate-200 p-6 dark:border-slate-700 dark:bg-slate-800'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-black dark:text-white'>
              Nama Lengkap
            </label>
            <input
              className='bg-input-dark focus:border-primary w-full rounded-lg border-transparent px-4 py-2.5 text-sm font-bold text-black uppercase placeholder-slate-500 focus:ring-0 dark:text-white'
              type='text'
              value={profileData.name}
              onChange={(e) =>
                onProfileDataChange({ ...profileData, name: e.target.value })
              }
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-black dark:text-white'>
              Email
            </label>
            <div className='relative'>
              <input
                className='bg-input-dark focus:border-primary w-full rounded-lg border-transparent px-4 py-2.5 pr-10 text-sm text-black placeholder-slate-500 focus:ring-0 dark:text-white'
                type='email'
                value={profileData.email}
                onChange={(e) =>
                  onProfileDataChange({
                    ...profileData,
                    email: e.target.value,
                  })
                }
              />
              {isVerified ? (
                <CheckCircle className='absolute top-1/2 right-3 -translate-y-1/2 text-green-500' />
              ) : (
                <span
                  className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xs text-red-500 hover:underline'
                  onClick={onResendVerification}
                >
                  Verifikasi Ulang
                </span>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-black dark:text-white'>
              Nomor Telepon
            </label>
            <input
              className='bg-input-dark focus:border-primary w-full rounded-lg border-transparent px-4 py-2.5 text-sm text-black placeholder-slate-500 focus:ring-0 dark:text-white'
              type='tel'
              value={profileData.phone}
              onChange={(e) =>
                onProfileDataChange({ ...profileData, phone: e.target.value })
              }
            />
          </div>
          <div className='flex flex-col gap-2'>
            <ProfileDatePicker
              date={profileData.birthDate}
              setDate={(date) =>
                onProfileDataChange({ ...profileData, birthDate: date })
              }
            />
            {!profileData.birthDate && (
              <p className='text-xs text-red-500 italic'>
                Tanggal lahir belum di atur, segera atur tanggal lahir anda
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
