'use client';

import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';
import { ResolvedAddress } from '@/src/components/dashboard/address/map/location-picker';
import { LocationSectionHandlers } from '@/src/components/dashboard/address/address-location-section';

function getDefaultValues(
  initial?: Partial<AddressFormValues> | null
): AddressFormValues {
  return {
    label: '',
    recipientName: '',
    recipientPhone: '',
    fullAddress: '',
    city: '',
    postalCode: '',
    latitude: null,
    longitude: null,
    notes: '',
    isPrimary: false,
    ...initial,
  };
}

function setLocationValues(
  form: UseFormReturn<AddressFormValues>,
  lat: number,
  lng: number
) {
  form.setValue('latitude', lat, { shouldValidate: true });
  form.setValue('longitude', lng, { shouldValidate: true });
}

function updateAddressFields(
  form: UseFormReturn<AddressFormValues>,
  addr: ResolvedAddress
) {
  const { fullAddress, city, postalCode } = addr;
  if (fullAddress) form.setValue('fullAddress', fullAddress);
  const cityValue = [city].filter(Boolean).join(', ');
  if (cityValue) form.setValue('city', cityValue);
  if (postalCode) form.setValue('postalCode', postalCode);
}

export function useAddressFormState(
  initial?: Partial<AddressFormValues> | null
): {
  form: UseFormReturn<AddressFormValues>;
  handlers: LocationSectionHandlers;
} {
  const form = useForm<AddressFormValues>({
    defaultValues: getDefaultValues(initial),
  });

  // Reset form values whenever initial data changes (e.g., editing different address)
  useEffect(() => {
    form.reset(getDefaultValues(initial));
  }, [initial, form]);

  const handleLocationSelect = (lat: number, lng: number) =>
    setLocationValues(form, lat, lng);

  const handleAddressChange = (addr: ResolvedAddress) =>
    updateAddressFields(form, addr);

  return {
    form,
    handlers: {
      onLocationSelect: handleLocationSelect,
      onAddressChange: handleAddressChange,
    },
  };
}
