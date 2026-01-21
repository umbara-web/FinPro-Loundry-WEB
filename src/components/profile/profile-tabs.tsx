import { clsx } from 'clsx';
import {
  User,
  MapPin,
  Lock,
  FileText,
  LucideIcon,
  AlertCircle,
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'personal-info', label: 'Info Pribadi', icon: User },
  { id: 'address', label: 'Alamat', icon: MapPin },
  { id: 'security', label: 'Keamanan', icon: Lock },
  { id: 'payment-history', label: 'Riwayat Pembayaran', icon: FileText },
  { id: 'complaint-history', label: 'Riwayat Komplain', icon: AlertCircle },
];

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className='bg-background-light dark:bg-background-dark sticky top-0 z-40 border-b border-slate-300 pt-2 pb-0 dark:border-slate-700'>
      <div className='no-scrollbar flex gap-8 overflow-x-auto border-b border-slate-300 dark:border-slate-700'>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                'flex cursor-pointer items-center gap-2 border-b-2 px-1 pb-3 whitespace-nowrap',
                isActive
                  ? 'border-blue-600'
                  : 'border-transparent hover:border-blue-600'
              )}
            >
              <Icon
                className={clsx(
                  'text-[20px]',
                  isActive
                    ? 'text-blue-600'
                    : 'text-black group-hover:text-blue-600 dark:text-white'
                )}
              />
              <p
                className={clsx(
                  'text-sm font-bold',
                  isActive
                    ? 'text-blue-600'
                    : 'text-black group-hover:text-blue-600 dark:text-white'
                )}
              >
                {tab.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
