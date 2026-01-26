import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';
import { LocationPicker } from './map/location-picker';

interface AddressLocationSectionProps {
  form: UseFormReturn<AddressFormValues>;
}

export function AddressLocationSection({ form }: AddressLocationSectionProps) {
  return (
    <>
      <FormField
        control={form.control}
        name='fullAddress'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alamat Lengkap</FormLabel>
            <FormControl>
              <Textarea
                placeholder='Alamat Lengkap Anda'
                className='resize-none'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kecamatan/Kota</FormLabel>
              <FormControl>
                <Input placeholder='Kecamatan/Kota Anda' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='postalCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Pos</FormLabel>
              <FormControl>
                <Input placeholder='Kode Pos Anda' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='space-y-2'>
        <LocationPicker
          latitude={form.watch('latitude')}
          longitude={form.watch('longitude')}
          onLocationSelect={(lat, lng) => {
            form.setValue('latitude', lat);
            form.setValue('longitude', lng);
          }}
          error={form.formState.errors.latitude?.message}
        />
      </div>
    </>
  );
}
