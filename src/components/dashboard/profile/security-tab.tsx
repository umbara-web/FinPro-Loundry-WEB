import { Input } from '@/src/components/ui/input';

interface SecurityTabProps {
  securityData: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  onSecurityDataChange: (data: any) => void;
}

export function SecurityTab({
  securityData,
  onSecurityDataChange,
}: SecurityTabProps) {
  return (
    <section id='security'>
      <h3 className='mb-4 flex items-center gap-2 text-lg font-bold text-black dark:text-white'>
        <span className='block h-6 w-1 rounded-full bg-blue-600' />
        Keamanan Akun
      </h3>
      <div className='rounded-xl border border-slate-300 bg-slate-200 p-6 dark:border-slate-700 dark:bg-slate-800'>
        <div className='flex max-w-2xl flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-black dark:text-white'>
              Kata Sandi Saat Ini
            </label>
            <Input
              className='w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black placeholder-white dark:text-white'
              placeholder='••••••••'
              type='password'
              value={securityData.oldPassword}
              onChange={(e) =>
                onSecurityDataChange({
                  ...securityData,
                  oldPassword: e.target.value,
                })
              }
            />
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-black dark:text-white'>
                Kata Sandi Baru
              </label>
              <Input
                className='w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black placeholder-white dark:text-white'
                placeholder='Masukan kata sandi baru'
                type='password'
                value={securityData.newPassword}
                onChange={(e) =>
                  onSecurityDataChange({
                    ...securityData,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-black dark:text-white'>
                Konfirmasi Kata Sandi Baru
              </label>
              <Input
                className='w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black placeholder-white dark:text-white'
                placeholder='Ulangi kata sandi baru'
                type='password'
                value={securityData.confirmNewPassword}
                onChange={(e) =>
                  onSecurityDataChange({
                    ...securityData,
                    confirmNewPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className='my-2 h-px bg-slate-300 dark:bg-slate-700' />
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-sm font-bold text-black dark:text-white'>
                Autentikasi Dua Faktor (2FA)
              </span>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                Tambahkan lapisan keamanan ekstra ke akun Anda.
              </span>
            </div>
            <label className='inline-flex cursor-pointer items-center'>
              <input type='checkbox' value='' className='peer sr-only' />
              <div className="bg-primary peer peer relative h-6 w-11 rounded-full peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:start-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:after:border-black dark:after:bg-black" />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
