export interface PaymentMethodConfig {
  value: string;
  icon: string;
  iconColor?: string;
  title: string;
  subtitle: string;
}

export interface LeftColumnProps {
  order: any;
  timeLeft: number;
  formatTime: (seconds: number) => string;
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
    icon: 'account_balance_wallet',
    title: 'GoPay',
    subtitle: 'Saldo: Rp 150.000',
  },
  {
    value: 'BNI_VA',
    icon: 'domain',
    iconColor: 'text-blue-600',
    title: 'Virtual Account (BCA/BNI)',
    subtitle: 'Transfer otomatis',
  },
  {
    value: 'CC',
    icon: 'credit_card',
    iconColor: 'text-orange-500',
    title: 'Kartu Kredit/Debit',
    subtitle: 'Visa, Mastercard',
  },
];
