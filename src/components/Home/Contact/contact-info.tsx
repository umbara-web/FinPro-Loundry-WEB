import { Phone, Mail, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className='group relative overflow-hidden rounded-xl bg-blue-500 p-6 text-white shadow-md md:p-8'>
      <div className='absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:bg-white/20'></div>
      <div className='absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-xl transition-all duration-500 group-hover:bg-white/20'></div>

      <h3 className='relative z-10 mb-6 text-xl font-bold'>Informasi Kontak</h3>

      <ul className='relative z-10 space-y-5.5'>
        <ContactItem
          icon={<Phone />}
          label='hubungi kami'
          value='+62 21 123-4567'
        />
        <ContactItem
          icon={<Mail />}
          label='kirim email kepada kami'
          value='support@freshlaundry.com'
        />
        <ContactItem
          icon={<Clock />}
          label='Jam Operasional'
          value={
            <>
              Senin-Jum'at,
              <br />
              08.00 - 17.00 WIB
              <br />
              Sabtu-Minggu,
              <br />
              08.00 - 15.00 WIB
            </>
          }
        />
      </ul>

      <div className='relative z-10 mt-8 border-t border-white/20 pt-8'>
        <p className='mb-4 text-sm font-medium text-white/80'>
          Terhubunglah dengan kami melalui sosial media kami.
        </p>
        <div className='flex gap-4'>
          <SocialLink href='#' icon={<Facebook className='h-5 w-5' />} />
          <SocialLink href='#' icon={<Twitter className='h-5 w-5' />} />
          <SocialLink href='#' icon={<Instagram className='h-5 w-5' />} />
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <li className='flex items-start gap-4'>
      <div className='rounded-lg bg-white/20 p-2 backdrop-blur-sm'>{icon}</div>
      <div>
        <p className='mb-1 text-sm font-medium text-white/70'>{label}</p>
        <p className='text-lg font-semibold'>{value}</p>
      </div>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className='rounded-lg bg-white/10 p-2 backdrop-blur-lg transition-colors hover:scale-105 hover:bg-white hover:text-black'
    >
      {icon}
    </a>
  );
}
