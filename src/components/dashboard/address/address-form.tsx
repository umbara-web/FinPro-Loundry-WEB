'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Form } from '@/src/components/ui/form';
import { AddressFormValues } from '@/src/lib/schemas/address-schemas';
import { AddressRecipientSection } from './address-recipient-section';
import {
  AddressLocationSection,
  LocationSectionHandlers,
} from './address-location-section';
import { AddressSettingsSection } from './address-settings-section';
import { useAddressFormState } from '@/src/hooks/use-address-form';

export type AddressFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AddressFormValues) => void;
  initialData?: Partial<AddressFormValues> | null;
  isLoading?: boolean;
};

type DialogProps = Omit<AddressFormProps, 'initialData'> & {
  form: UseFormReturn<AddressFormValues>;
  handlers: LocationSectionHandlers;
  isEdit: boolean;
};

function AddressFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  form,
  handlers,
  isEdit,
}: DialogProps) {
  const handleSubmit = (values: AddressFormValues) => onSubmit(values);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-150'>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Ubah Alamat' : 'Tambah Alamat Baru'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <AddressFormBody
            form={form}
            handlers={handlers}
            isLoading={!!isLoading}
            onSubmit={handleSubmit}
            onClose={() => onOpenChange(false)}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type BodyProps = {
  form: UseFormReturn<AddressFormValues>;
  handlers: LocationSectionHandlers;
  isLoading: boolean;
  onSubmit: (values: AddressFormValues) => void;
  onClose: () => void;
};

function AddressFormBody(props: BodyProps) {
  const { form, handlers, isLoading, onSubmit, onClose } = props;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 py-4'>
      <AddressRecipientSection form={form} />
      <AddressLocationSection form={form} handlers={handlers} />
      <AddressSettingsSection form={form} />
      <AddressFormFooter isLoading={isLoading} onClose={onClose} />
    </form>
  );
}

type FooterProps = {
  isLoading: boolean;
  onClose: () => void;
};

function AddressFormFooter({ isLoading, onClose }: FooterProps) {
  return (
    <DialogFooter>
      <Button
        type='button'
        variant='outline'
        onClick={onClose}
        disabled={isLoading}
        className='cursor-pointer font-bold'
      >
        Batal
      </Button>
      <Button
        type='submit'
        variant='default'
        disabled={isLoading}
        className='cursor-pointer border-blue-600 bg-blue-600 font-bold hover:bg-gray-300/90 hover:text-black'
      >
        {isLoading ? 'Menyimpan...' : 'Simpan Alamat'}
      </Button>
    </DialogFooter>
  );
}

export function AddressForm(props: AddressFormProps) {
  const { initialData, ...dialogProps } = props;
  const { form, handlers } = useAddressFormState(initialData);
  const isEdit = !!initialData;

  return (
    <AddressFormDialog
      {...dialogProps}
      form={form}
      handlers={handlers}
      isEdit={isEdit}
    />
  );
}
