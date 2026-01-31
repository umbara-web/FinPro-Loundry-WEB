import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';

type Props = {
  form: UseFormReturn<AddressFormValues>;
};

type ControlProps = {
  control: UseFormReturn<AddressFormValues>['control'];
};

export function AddressRecipientSection({ form }: Props) {
  const { control } = form;
  return (
    <>
      <LabelField control={control} />
      <RecipientRow control={control} />
    </>
  );
}

function LabelField({ control }: ControlProps) {
  return (
    <FormField
      control={control}
      name='label'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold text-black dark:text-white'>
            Label Alamat (Contoh: Rumah, Kantor){' '}
            <span className='text-red-500'>*</span>
          </FormLabel>
          <Input placeholder='Rumah' {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function RecipientRow({ control }: ControlProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <RecipientNameField control={control} />
      <RecipientPhoneField control={control} />
    </div>
  );
}

function RecipientNameField({ control }: ControlProps) {
  return (
    <FormField
      control={control}
      name='recipientName'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold text-black dark:text-white'>
            Nama Penerima <span className='text-red-500'>*</span>
          </FormLabel>
          <Input placeholder='Nama...' {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function RecipientPhoneField({ control }: ControlProps) {
  return (
    <FormField
      control={control}
      name='recipientPhone'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold text-black dark:text-white'>
            Nomor Handphone/WA <span className='text-red-500'>*</span>
          </FormLabel>
          <Input placeholder='Nomor HP...' {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
