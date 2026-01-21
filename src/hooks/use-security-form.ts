import { useState } from 'react';
import { toast } from 'sonner';
import { userApi } from '@/src/lib/api/user-api';

interface SecurityFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function useSecurityForm() {
  const [securityData, setSecurityData] = useState<SecurityFormData>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handlePasswordChange = async () => {
    if (securityData.newPassword !== securityData.confirmNewPassword) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }

    try {
      const toastId = toast.loading('Menyimpan perubahan...');
      await userApi.changePassword(securityData);
      toast.dismiss(toastId);
      toast.success('Password berhasil diperbarui');
      setSecurityData({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Gagal menyimpan perubahan');
    }
  };

  return {
    securityData,
    setSecurityData,
    handlePasswordChange,
  };
}
