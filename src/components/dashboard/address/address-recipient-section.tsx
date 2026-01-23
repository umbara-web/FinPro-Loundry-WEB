import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';

interface AddressRecipientSectionProps {
  form: UseFormReturn<AddressFormValues>;
}

export function AddressRecipientSection({
  form,
}: AddressRecipientSectionProps) {
  return (
    <>
      <FormField
        control={form.control}
        name='label'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Label Alamat (Contoh: Rumah, Kantor)</FormLabel>
            <FormControl>
              <Input placeholder='Rumah' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='recipientName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Penerima</FormLabel>
              <FormControl>
                <Input placeholder='Nama...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='recipientPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Handphone</FormLabel>
              <FormControl>
                <Input placeholder='Nomor HP...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
