// ============== FORMATTER FUNCTIONS ==============

type BadgeStyle = { label: string; bg: string; text: string; border: string };

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  GOPAY: 'GoPay',
  DANA: 'DANA',
  OVO: 'OVO',
  BCA_VA: 'VA BCA',
  MANDIRI_VA: 'VA Mandiri',
  SIMULATION: 'Simulasi',
  GOPAY_SIMULATION: 'GoPay',
};

const BADGE_STYLES: Record<string, BadgeStyle> = {
  PAID: {
    label: 'Berhasil',
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
  },
  PENDING: {
    label: 'Menunggu',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  FAILED: {
    label: 'Gagal',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/20',
  },
  EXPIRED: {
    label: 'Kadaluwarsa',
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/20',
  },
  REFUNDED: {
    label: 'Dikembalikan',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
  },
};

const DEFAULT_BADGE = BADGE_STYLES.PENDING;

export function getMethodLabel(method: string | undefined | null): string {
  if (!method) return '-';
  return PAYMENT_METHOD_LABELS[method] || method;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getPaymentStatusBadge(
  paymentStatus: string | undefined
): BadgeStyle {
  const status = paymentStatus || 'PENDING';
  return BADGE_STYLES[status] || DEFAULT_BADGE;
}

export function generateTransactionId(
  globalNumber: number,
  orderId: string
): string {
  return `${String(globalNumber).padStart(3, '0')}-${orderId.slice(0, 8).toUpperCase()}`;
}

export type { BadgeStyle };
