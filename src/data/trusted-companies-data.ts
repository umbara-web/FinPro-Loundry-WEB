import { StaticImageData } from 'next/image';

import BcaIcon from '@/public/icons/bca.svg';
import BriIcon from '@/public/icons/bri.svg';
import CashlezIcon from '@/public/icons/cashlez.svg';
import CrowneIcon from '@/public/icons/crowne.png';
import GoPayIcon from '@/public/icons/gopay.svg';
import IndomaretIcon from '@/public/icons/indomaret.svg';
import MandiriIcon from '@/public/icons/mandiri.svg';
import PaxelIcon from '@/public/icons/paxel.svg';
import PaytrenIcon from '@/public/icons/paytren.svg';
import PosindonesiaIcon from '@/public/icons/pos-indonesia.svg';
import PramukaCityIcon from '@/public/icons/pramuka-city.png';
import SenayancityIcon from '@/public/icons/senayan-city.svg';
import SiloamIcon from '@/public/icons/siloam.svg';
import SinarmasIcon from '@/public/icons/sinarmas.svg';

type TrustedCompanyImageProps = {
  src: StaticImageData;
  alt: string;
};

export const trustedCompaniesData: TrustedCompanyImageProps[] = [
  {
    src: BcaIcon,
    alt: 'BCA',
  },
  {
    src: BriIcon,
    alt: 'BRI',
  },
  {
    src: CashlezIcon,
    alt: 'Cashlez',
  },
  {
    src: CrowneIcon,
    alt: 'Crowne',
  },
  {
    src: GoPayIcon,
    alt: 'GoPay',
  },
  {
    src: IndomaretIcon,
    alt: 'Indomaret',
  },
  {
    src: MandiriIcon,
    alt: 'Mandiri',
  },
  {
    src: PaxelIcon,
    alt: 'Paxel',
  },
  {
    src: PaytrenIcon,
    alt: 'Paytren',
  },
  {
    src: PosindonesiaIcon,
    alt: 'Posindonesia',
  },
  {
    src: PramukaCityIcon,
    alt: 'PramukaCity',
  },
  {
    src: SenayancityIcon,
    alt: 'Senayancity',
  },
  {
    src: SiloamIcon,
    alt: 'Siloam',
  },
  {
    src: SinarmasIcon,
    alt: 'Sinarmas',
  },
];
