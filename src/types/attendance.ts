export interface AttendanceStatus {
  isClockedIn: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
  weeklyHours: number;
  overtime: number;
  station: string;
  staffName: string;
  lastShiftEnd: string | null;
}

export interface AttendanceRecord {
  id: string;
  staff_id: string;
  outlet_id: string;
  shift_id: string;
  status: string;
  check_in_at: string;
  check_out_at: string | null;
}

export interface AttendanceHistoryResponse {
  data: AttendanceRecord[];
}

export interface AttendanceStatusResponse {
  data: AttendanceStatus;
}

export interface AttendanceActionResponse {
  message: string;
}
