import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Textarea } from '@/src/components/ui/textarea';
import { Switch } from '@/src/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';

type Props = {
  form: UseFormReturn<AddressFormValues>;
};

type ControlProps = {
  control: UseFormReturn<AddressFormValues>['control'];
};

export function AddressSettingsSection({ form }: Props) {
  const { control } = form;
  return (
    <>
      <NotesField control={control} />
      <PrimarySwitchField control={control} />
    </>
  );
}

function NotesField({ control }: ControlProps) {
  return (
    <FormField
      control={control}
      name='notes'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold text-black dark:text-white'>
            Catatan (Opsional)
          </FormLabel>
          <Textarea
            placeholder='Contoh: Patokan rumah warna biru, samping Masjid, dll...'
            {...field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PrimarySwitchField({ control }: ControlProps) {
  return (
    <FormField
      control={control}
      name='isPrimary'
      render={({ field }) => (
        <FormItem className='flex flex-row items-center justify-between rounded-lg border border-blue-500 p-4'>
          <div className='space-y-0.5'>
            <FormLabel className='text-base text-black dark:text-white'>
              Alamat Utama
            </FormLabel>
            <p className='text-muted-foreground text-sm'>
              Jadikan ini sebagai alamat default untuk pesanan.
            </p>
          </div>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </FormItem>
      )}
    />
  );
}
