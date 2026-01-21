'use client';

import { useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useProfileForm } from '@/src/hooks/use-profile-form';
import { useSecurityForm } from '@/src/hooks/use-security-form';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { ProfileTabs } from '@/src/components/profile/profile-tabs';
import { PersonalInfoTab } from '@/src/components/profile/personal-info-tab';
// import { AddressTab } from '@/src/components/profile/address-tab';
import { SecurityTab } from '@/src/components/profile/security-tab';
// import { PaymentHistoryTab } from '@/src/components/profile/payment-history-tab';
// import { ComplaintHistoryTab } from '@/src/components/profile/complaint-history-tab';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal-info');
  const { user } = useAuth();

  const {
    profileData,
    setProfileData,
    handleAvatarUpload,
    handleProfileUpdate,
    handleResendVerification,
  } = useProfileForm();

  const { securityData, setSecurityData, handlePasswordChange } =
    useSecurityForm();

  const handleSave = () => {
    if (activeTab === 'personal-info') {
      handleProfileUpdate();
    } else if (activeTab === 'security') {
      handlePasswordChange();
    }
  };

  return (
    <main className='flex h-screen w-full flex-col overflow-hidden p-4 px-8 md:px-44 md:py-8'>
      <div className='mb-8 flex flex-col gap-2'>
        <h1 className='text-3xl font-black tracking-tight text-black md:text-4xl dark:text-white'>
          Profil Pengguna
        </h1>
        <p className='text-base text-gray-500 dark:text-gray-400'>
          Kelola informasi pribadi, alamat penjemputan, dan keamanan akun Anda.
        </p>
      </div>

      <ProfileHeader
        userName={user?.name}
        profilePictureUrl={user?.profile_picture_url}
        onAvatarUpload={handleAvatarUpload}
      />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className='flex flex-1 flex-col gap-8 overflow-y-auto py-6 pr-4'>
        {activeTab === 'personal-info' && (
          <PersonalInfoTab
            profileData={profileData}
            isVerified={user?.isVerified}
            onProfileDataChange={setProfileData}
            onResendVerification={handleResendVerification}
          />
        )}

        {/* {activeTab === 'address' && <AddressTab />} */}

        {activeTab === 'security' && (
          <SecurityTab
            securityData={securityData}
            onSecurityDataChange={setSecurityData}
          />
        )}

        {/* {activeTab === 'payment-history' && <PaymentHistoryTab />} */}

        {/* {activeTab === 'complaint-history' && <ComplaintHistoryTab />} */}

        {activeTab !== 'payment-history' &&
          activeTab !== 'complaint-history' && (
            <div className='flex items-center justify-end gap-4 pt-4 pb-12'>
              <button className='h-12 cursor-pointer rounded-lg px-6 font-bold text-black transition-colors hover:bg-blue-600 hover:text-white dark:text-white'>
                Batal
              </button>
              <button
                onClick={handleSave}
                className='h-12 transform cursor-pointer rounded-lg bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-slate-600 active:scale-95'
              >
                Simpan Perubahan
              </button>
            </div>
          )}
      </div>
    </main>
  );
}
