import { AddressListSection } from '@/src/components/dashboard/address/address-list-section';

export function AddressTab() {
  return (
    <section id='address'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='flex items-center gap-2 text-lg font-bold text-black dark:text-white'>
          <span className='block h-6 w-1 rounded-full bg-blue-600' />
          Alamat Penjemputan
        </h3>
      </div>
      <AddressListSection
        onEdit={() => {
          window.location.href = '/dashboard/addresses';
        }}
        showActions={true}
      />
    </section>
  );
}
