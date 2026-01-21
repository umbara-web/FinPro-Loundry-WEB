import { api } from './axios-instance';

// Auth API
export const authApi = {
  register: async (data: { name: string; email: string; phone: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  verify: async (data: { token: string; password: string }) => {
    const response = await api.post('/auth/verification', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  socialLogin: async (data: { email: string; name: string }) => {
    const response = await api.post('/auth/social', data);
    return response.data;
  },
  requestResetPassword: async (data: { email: string }) => {
    const response = await api.post('/auth/request-reset-password', data);
    return response.data;
  },
  resetPassword: async (data: { token: string; password: string }) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  resendVerification: async (data: { email: string }) => {
    const response = await api.post('/auth/resend-verification', data);
    return response.data;
  },
};
