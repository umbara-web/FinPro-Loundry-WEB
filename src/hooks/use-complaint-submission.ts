import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getOrders } from '@/src/lib/api/order-api';
import { toast } from 'sonner';

export interface ComplaintFormData {
  orderId: string;
  type: string;
  description: string;
  images: File[];
}

export function useComplaintSubmission() {
  const [formData, setFormData] = useState<ComplaintFormData>({
    orderId: '',
    type: '',
    description: '',
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders-for-complaint'],
    queryFn: () =>
      getOrders({
        page: 1,
        limit: 50,
        sortBy: 'created_at',
        sortOrder: 'desc',
      }),
  });

  const complaintableOrders =
    ordersData?.data?.filter((order) =>
      ['DELIVERED', 'COMPLETED', 'CANCELLED'].includes(order.status)
    ) || [];

  const createComplaintMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit complaint');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Komplain berhasil diajukan!');
      setFormData({
        orderId: '',
        type: '',
        description: '',
        images: [],
      });
      setImagePreviews([]);
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal mengajukan komplain');
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      toast.error('Maksimal 5 gambar yang dapat diupload');
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData((prev) => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);

    URL.revokeObjectURL(imagePreviews[index]);
  };

  const submitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.orderId || !formData.type || !formData.description.trim()) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    if (formData.description.trim().length < 10) {
      toast.error('Deskripsi minimal 10 karakter');
      return;
    }

    const submitData = new FormData();
    submitData.append('orderId', formData.orderId);
    submitData.append('type', formData.type);
    submitData.append('description', formData.description.trim());

    formData.images.forEach((image) => {
      submitData.append('images', image);
    });

    createComplaintMutation.mutate(submitData);
  };

  return {
    formData,
    setFormData,
    imagePreviews,
    ordersLoading,
    complaintableOrders,
    createComplaintMutation,
    handleImageUpload,
    removeImage,
    submitComplaint,
  };
}
