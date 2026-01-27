import { api as axiosInstance } from './axios-instance';
import {
  AttendanceStatusResponse,
  AttendanceHistoryResponse,
  AttendanceActionResponse,
} from '@/src/types/attendance';

export const attendanceApi = {
  getStatus: async (): Promise<AttendanceStatusResponse> => {
    const { data } = await axiosInstance.get('/attendance/status');
    return data;
  },

  getHistory: async (): Promise<AttendanceHistoryResponse> => {
    const { data } = await axiosInstance.get('/attendance/history');
    return data;
  },

  clockIn: async (): Promise<AttendanceActionResponse> => {
    const { data } = await axiosInstance.post('/attendance/clock-in');
    return data;
  },

  clockOut: async (): Promise<AttendanceActionResponse> => {
    const { data } = await axiosInstance.post('/attendance/clock-out');
    return data;
  },
};
