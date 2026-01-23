import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Switch } from '@/src/components/ui/switch';
import { Textarea } from '@/src/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';

interface AddressSettingsSectionProps {
  form: UseFormReturn<AddressFormValues>;
}

export function AddressSettingsSection({ form }: AddressSettingsSectionProps) {
  return (
    <>
      <FormField
        control={form.control}
        name='notes'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catatan (Opsional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder='Contoh: Patokan Rumah Warna Biru, samping Masjid, dll...'
                className='resize-none'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='isPrimary'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <FormLabel className='text-base'>Alamat Utama</FormLabel>
              <div className='text-muted-foreground text-sm'>
                Jadikan ini sebagai alamat default untuk pesanan.
              </div>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
