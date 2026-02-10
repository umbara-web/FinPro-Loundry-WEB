export interface PaymentMethodConfig {
  value: string;
  icon: string;
  iconColor?: string;
  title: string;
  subtitle: string;
}

export interface LeftColumnProps {
  order: any;
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

export interface PaymentMethodsSectionProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

export interface RightColumnProps {
  order: any;
  isPending: boolean;
  onPayment: () => void;
}

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    value: 'GOPAY',
    icon: '/icons/gopay.svg',
    title: 'GoPay',
    subtitle: 'Saldo: Rp ???',
  },
  {
    value: 'DANA',
    icon: '/icons/dana.svg',
    title: 'DANA',
    subtitle: 'Saldo: Rp ???',
  },
  {
    value: 'OVO',
    icon: '/icons/ovo.svg',
    title: 'OVO',
    subtitle: 'Saldo: Rp ???',
  },
  {
    value: 'BCA_VA',
    icon: '/icons/bca.svg',
    iconColor: 'text-blue-600',
    title: 'Virtual Account (BCA)',
    subtitle: 'Transfer otomatis',
  },
  {
    value: 'MANDIRI_VA',
    icon: '/icons/mandiri.svg',
    iconColor: 'text-orange-500',
    title: 'Virtual Account (Mandiri)',
    subtitle: 'Transfer otomatis',
  },
];
