'use client';

const teamMembers = [
  {
    name: 'Marcus Chen',
    role: 'Founder & CEO',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtOHL-SxSCdq37JZm_0ylg2fNS-QID0w2JcGTqXVx-ozGik9SXiEYLIlAwLGn6npG9Aaeb0buoiHA2_I43OYbfx4oq62bTZI7QSSaRiJrC0RQ2ibgX7O9IHfYJULkxuJbPWe9rs7QwwkNwaSllmOWJvMkWaMtQDqa7l_2j0K11257UubDxtACshvmN7B2wHB7h0-mxX3dBVhOcaxCkCmMVoHmqP-8FbHPIk2bJCpbmQoSOPh32aN07GdyBx-ZWfL7UcY1iHmqvJ20',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Admin Outlet',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAY7d31yuz-l23erY0Nvzg2lIHHvdQAQzMXNF2F2J0HoBsTY-HxDE49MqSfeA0qaTZKHrqiHDycgpqewL9Z_l5d36q4G8vv5raIxpP1YnuPTE64dkdrrBz7qpSXk0sZlCPp7e5ESROQVI_mP_75OO0E-kNcmOmI_lQW11wNtwGdJ6WWwbh8rZ_6Ao__I2a42QSeao1HqThdP_YNVXY2OlLOOehJ_HP_ol8oaeXZGcM27jeiEFlOhqvN0Ez71JjWVA3bG47rNQCFRss',
  },
  {
    name: 'David Miller',
    role: 'Quality Control',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdeblG7nudFItdErqc-FErHtQANbRa2lfAJFj0VEITMLu58pn-yxMBRdfv5DVbu4IcHEmQ_5Zil0W9e1u1RsVxWN4UhSw2M2tnMX3XAuVg0xOximsoRkQiRtBOSu2BhAbrUMDyEjnhgC97sUQU81m6buaWts7aAJIwroVODU1b6DsaG5U3z5LtDSpTjLK_bTjAfLUU_Lu_61GmVrppv2kuRrnrVu6__EAl1S7vblbQDi2gl23uygyThzBM7qRs3LoVCcNVUworADc',
  },
  {
    name: 'Emily Ross',
    role: 'Karyawan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD00qbrEhaE9XcqJtsWPtkeD5IL0vOCKTnutlhrC5U2pnW53Wh5vQWhs2-jciJZKJfQiDOg6egyOtguXQlo_6BwPxpd2IjheYCP1Cy3s0RFSTMjDpIIKJLr9LPyb0YsokzNa3QNHBooIHtIBNJZ7J-CrNJTOJM282krjRAXQ1XSKttnd_pCLc8Q74hb5novZUhzHKCyhd1e3DyPsjMZfvfekPBCWkYp0dMU2XJPRnmuxVEvzveJy8NiSMeEjhzg8Wj-2NHlBLK7Fh4',
  },
];

export function AboutTeam() {
  return (
    <div className='flex flex-col gap-10 pt-8'>
      <div className='text-center'>
        <h2 className='text-4xl leading-tight font-bold text-black dark:text-white'>
          Kenali Tim Kami
        </h2>
        <p className='mt-2 text-slate-500 dark:text-slate-400'>
          Orang-orang yang berdedikasi untuk menjaga agar lemari pakaian Anda
          tetap segar.
        </p>
      </div>
      <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className='flex flex-col items-center gap-3 text-center'
          >
            <div className='h-24 w-24 overflow-hidden rounded-full bg-slate-200'>
              <img
                className='h-full w-full object-cover'
                src={member.image}
                alt={`Portrait of ${member.name}`}
              />
            </div>
            <div>
              <h4 className='font-bold text-black dark:text-white'>
                {member.name}
              </h4>
              <p className='text-xs font-medium tracking-wider text-blue-500 uppercase'>
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
