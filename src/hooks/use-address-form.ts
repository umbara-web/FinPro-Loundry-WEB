import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddressFormValues,
  addressSchema,
} from '@/src/lib/schemas/address-schemas';
import { Address } from '@/src/types/address';

interface UseAddressFormProps {
  initialData?: Address | null;
  open: boolean;
}

export function useAddressForm({ initialData, open }: UseAddressFormProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: '',
      recipientName: '',
      recipientPhone: '',
      fullAddress: '',
      city: '',
      postalCode: '',
      notes: '',
      latitude: 0,
      longitude: 0,
      isPrimary: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        label: initialData.label,
        recipientName: initialData.recipientName,
        recipientPhone: initialData.recipientPhone,
        fullAddress: initialData.fullAddress,
        city: initialData.city,
        postalCode: initialData.postalCode,
        notes: initialData.notes || '',
        latitude: initialData.latitude,
        longitude: initialData.longitude,
        isPrimary: initialData.isPrimary,
      });
    } else {
      form.reset({
        label: '',
        recipientName: '',
        recipientPhone: '',
        fullAddress: '',
        city: '',
        postalCode: '',
        notes: '',
        latitude: 0,
        longitude: 0,
        isPrimary: false,
      });
    }
  }, [initialData, form, open]);

  return form;
}
