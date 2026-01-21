import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { userApi } from '@/src/lib/api/user-api';
import { authApi } from '@/src/lib/api/auth-api';
import { useAuth } from '@/src/context/AuthContext';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  birthDate?: Date;
}

export function useProfileForm() {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: '',
    birthDate: undefined,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
      });
    }
  }, [user]);

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Type file tidak didukung. Gunakan JPG, PNG, atau GIF.');
      return false;
    }
    if (file.size > 1 * 1024 * 1024) {
      toast.error('Ukuran file terlalu besar. Maksimal 1MB.');
      return false;
    }
    return true;
  };

  const handleAvatarUpload = async (file: File) => {
    if (!validateFile(file)) return;

    try {
      const toastId = toast.loading('Mengupload foto...');
      const updatedUser = await userApi.updateAvatar(file);

      if (updatedUser?.data) {
        updateUser(updatedUser.data);
        toast.dismiss(toastId);
        toast.success('Foto profil berhasil diperbarui!');
      } else {
        toast.dismiss(toastId);
        toast.error('Gagal memperbarui foto profil.');
      }
    } catch (error) {
      toast.error('Gagal mengupload foto.');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const toastId = toast.loading('Menyimpan perubahan...');
      const emailChanged = profileData.email !== user?.email;

      const updatedUser = await userApi.updateProfile(profileData);

      if (updatedUser?.data) {
        updateUser(updatedUser.data);
        toast.dismiss(toastId);
        toast.success('Profil berhasil diperbarui!');
        if (emailChanged) {
          toast.info('Email berubah, silakan verifikasi ulang email Anda.');
        }
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Gagal menyimpan perubahan');
    }
  };

  const handleResendVerification = async () => {
    if (!user?.email) return;
    try {
      const toastId = toast.loading('Mengirim email verifikasi...');
      await authApi.resendVerification({ email: user.email });
      toast.dismiss(toastId);
      toast.success('Email verifikasi dikirim! Silakan periksa inbox Anda.');
    } catch (error: any) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || 'Gagal mengirim email verifikasi'
      );
    }
  };

  return {
    profileData,
    setProfileData,
    handleAvatarUpload,
    handleProfileUpdate,
    handleResendVerification,
  };
}
