'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Form } from '@/src/components/ui/form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';
import { Address } from '@/src/types/address';
import { useAddressForm } from '@/src/hooks/use-address-form';
import { AddressRecipientSection } from './address-recipient-section';
import { AddressLocationSection } from './address-location-section';
import { AddressSettingsSection } from './address-settings-section';

interface AddressFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AddressFormValues) => void;
  initialData?: Address | null;
  isLoading?: boolean;
}

export function AddressForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading,
}: AddressFormProps) {
  const form = useAddressForm({ initialData, open });

  const handleSubmit = (data: AddressFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-150'>
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Ubah Alamat' : 'Tambah Alamat Baru'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6 py-4'
          >
            <AddressRecipientSection form={form} />
            <AddressLocationSection form={form} />
            <AddressSettingsSection form={form} />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan Alamat'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
