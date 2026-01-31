import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';
import { LocationPicker, ResolvedAddress } from './map/location-picker';

export type LocationSectionHandlers = {
  onLocationSelect: (lat: number, lng: number) => void;
  onAddressChange: (addr: ResolvedAddress) => void;
};

type Props = {
  form: UseFormReturn<AddressFormValues>;
  handlers: LocationSectionHandlers;
};

type ControlProps = {
  control: UseFormReturn<AddressFormValues>['control'];
};

export function AddressLocationSection({ form, handlers }: Props) {
  const { control, watch, formState } = form;
  const { onLocationSelect, onAddressChange } = handlers;

  return (
    <>
      <FullAddressField control={control} />
      <CityPostalRow control={control} />
      <LocationPicker
        latitude={watch('latitude')}
        longitude={watch('longitude')}
        onLocationSelect={onLocationSelect}
        onAddressChange={onAddressChange}
        error={formState.errors.latitude?.message}
      />
    </>
  );
}

function FullAddressField({ control }: ControlProps) {
  return (
    <FormField
      control={control}
      name='fullAddress'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold text-black dark:text-white'>
            Alamat Lengkap <span className='text-red-500'>*</span>
          </FormLabel>
          <Textarea placeholder='Alamat Lengkap Anda' {...field} />
          <p className='text-xs text-red-500 italic'>
            Sesuaikan alamat lengkap anda, jika alamat di atas tidak sesuai
            seperti : Nama Jalan No Rumah, RT/RW, Kelurahan, Kecamatan,
            Kota/Kabupaten, Provinsi dan Kode Pos
          </p>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function CityPostalRow({ control }: ControlProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <CityField control={control} />
      <PostalCodeField control={control} />
    </div>
  );
}

function CityField({ control }: ControlProps) {
  return (
    <FormField
      control={control}
      name='city'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold text-black dark:text-white'>
            Kota/Kabupaten <span className='text-red-500'>*</span>
          </FormLabel>
          <Input placeholder='Kota/Kabupaten Anda' {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PostalCodeField({ control }: ControlProps) {
  return (
    <FormField
      control={control}
      name='postalCode'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold text-black dark:text-white'>
            Kode Pos <span className='text-red-500'>*</span>
          </FormLabel>
          <Input placeholder='Kode Pos Anda' {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
