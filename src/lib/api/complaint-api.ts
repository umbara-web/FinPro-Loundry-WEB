import { api as axiosInstance } from './axios-instance';

export interface CreateComplaintData {
  orderId: string;
  type: 'DAMAGE' | 'LOST' | 'NOT_MATCH' | 'REJECTED';
  description: string;
  images?: File[];
}

export interface Complaint {
  id: string;
  order_id: string;
  customer_id: string;
  type: 'DAMAGE' | 'LOST' | 'NOT_MATCH' | 'REJECTED';
  description: string;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';
  created_at: string;
  updated_at: string;
  order?: {
    id: string;
    status: string;
    total_weight: number;
    price_total: number;
    created_at: string;
  };
}

export interface ComplaintListResponse {
  message: string;
  data: Complaint[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetComplaintsParams {
  page?: number;
  limit?: number;
  status?: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// Create a new complaint
export const createComplaint = async (
  data: CreateComplaintData
): Promise<Complaint> => {
  const formData = new FormData();
  formData.append('orderId', data.orderId);
  formData.append('type', data.type);
  formData.append('description', data.description);

  if (data.images) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const response = await axiosInstance.post('/complaints', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

// Get all complaints for current user
export const getComplaints = async (
  params: GetComplaintsParams = {}
): Promise<ComplaintListResponse> => {
  const response = await axiosInstance.get('/complaints', { params });
  return response.data;
};

// Get complaint by ID
export const getComplaintById = async (
  complaintId: string
): Promise<Complaint> => {
  const response = await axiosInstance.get(`/complaints/${complaintId}`);
  return response.data.data;
};

// Get complaint by order ID
export const getComplaintByOrderId = async (
  orderId: string
): Promise<Complaint | null> => {
  const response = await axiosInstance.get(`/complaints/order/${orderId}`);
  return response.data.data;
};

// Chat Messages
export interface ComplaintMessage {
  id: string;
  complaint_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
  sender: {
    id: string;
    name: string;
    role: string;
    profile_picture_url: string | null;
  };
}

export const sendMessage = async (
  complaintId: string,
  message: string
): Promise<ComplaintMessage> => {
  const response = await axiosInstance.post(
    `/complaints/${complaintId}/messages`,
    { message }
  );
  return response.data.data;
};

export const getMessages = async (
  complaintId: string
): Promise<ComplaintMessage[]> => {
  const response = await axiosInstance.get(
    `/complaints/${complaintId}/messages`
  );
  return response.data.data;
};
