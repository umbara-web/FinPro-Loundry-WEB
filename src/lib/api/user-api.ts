import { api } from './axios-instance';
import { Address, AddressInput } from '@/src/types/address';

export const userApi = {
  // Addresses
  getAddresses: async () => {
    const response = await api.get<Address[]>('/users/addresses');
    return response.data;
  },

  createAddress: async (data: AddressInput) => {
    const response = await api.post<Address>('/users/addresses', data);
    return response.data;
  },

  updateAddress: async (id: string, data: AddressInput) => {
    const response = await api.put<Address>(`/users/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: string) => {
    const response = await api.delete(`/users/addresses/${id}`);
    return response.data;
  },

  setPrimaryAddress: async (id: string) => {
    const response = await api.patch<Address>(`/users/addresses/${id}/primary`);
    return response.data;
  },

  updateAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.patch('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProfile: async (data: {
    name?: string;
    phone?: string;
    email?: string;
    birthDate?: Date;
  }) => {
    const response = await api.patch('/users/profile', data);
    return response.data;
  },

  changePassword: async (data: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    const response = await api.patch('/users/password', data);
    return response.data;
  },
};
