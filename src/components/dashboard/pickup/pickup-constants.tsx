import React from 'react';
import {
  PiPantsDuotone,
  PiShirtFolded,
  PiNotePencilBold,
} from 'react-icons/pi';
import {
  GiShorts,
  GiMonclerJacket,
  GiSkirt,
  GiTravelDress,
  GiTowel,
} from 'react-icons/gi';
import { RiShirtFill } from 'react-icons/ri';
import { IoShirtSharp } from 'react-icons/io5';
import { LuShirt } from 'react-icons/lu';
import { BiSolidBlanket, BiBed } from 'react-icons/bi';
import { NearestOutletResult } from '@/src/types/pickup';

// Constants
export interface LaundryItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const LAUNDRY_ITEMS: LaundryItem[] = [
  {
    id: 'baju-kaos',
    name: 'Baju / Kaos',
    description: 'Pakaian atasan umum',
    icon: <IoShirtSharp className='h-6 w-6' />,
  },
  {
    id: 'jas',
    name: 'Jas',
    description: 'Pakaian formal set',
    icon: <RiShirtFill className='h-6 w-6' />,
  },
  {
    id: 'celana-panjang',
    name: 'Celana Panjang',
    description: 'Jeans, Chino, dll',
    icon: <PiPantsDuotone className='h-6 w-6' />,
  },
  {
    id: 'celana-pendek',
    name: 'Celana Pendek',
    description: 'Kolor, Cargo pendek',
    icon: <GiShorts className='h-6 w-6' />,
  },
  {
    id: 'kemeja',
    name: 'Kemeja',
    description: 'Lengan pendek/panjang',
    icon: <PiShirtFolded className='h-6 w-6' />,
  },
  {
    id: 'pakaian-dalam',
    name: 'Pakaian Dalam',
    description: 'Celana dalam, kaos dalam',
    icon: <LuShirt className='h-6 w-6' />,
  },
];

// Helper to get icon based on item name
export function getItemIcon(name: string): React.ReactNode {
  const n = name.toLowerCase();
  if (n.includes('baju') || n.includes('kaos'))
    return <IoShirtSharp className='h-6 w-6' />;
  if (n.includes('jas')) return <RiShirtFill className='h-6 w-6' />;
  if (n.includes('celana') && n.includes('panjang'))
    return <PiPantsDuotone className='h-6 w-6' />;
  if (n.includes('celana') && n.includes('pendek'))
    return <GiShorts className='h-6 w-6' />;
  if (n.includes('celana')) return <PiPantsDuotone className='h-6 w-6' />;
  if (n.includes('kemeja')) return <PiShirtFolded className='h-6 w-6' />;
  if (n.includes('dalam')) return <LuShirt className='h-6 w-6' />;
  if (n.includes('jaket')) return <GiMonclerJacket className='h-6 w-6' />;
  if (n.includes('rok')) return <GiSkirt className='h-6 w-6' />;
  if (n.includes('dress')) return <GiTravelDress className='h-6 w-6' />;
  if (n.includes('selimut')) return <BiSolidBlanket className='h-6 w-6' />;
  if (n.includes('sprei')) return <BiBed className='h-6 w-6' />;
  if (n.includes('handuk')) return <GiTowel className='h-6 w-6' />;
  return <PiNotePencilBold className='h-6 w-6' />;
}

// Utils
export function formatDateDisplay(date: string): string {
  if (!date) return 'Pilih Tanggal';
  return new Date(date)
    .toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(/ /g, '-');
}

export function getOutletDisplay(
  nearestOutlet?: NearestOutletResult,
  isOutletLoading?: boolean
) {
  if (isOutletLoading)
    return {
      title: 'Mencari outlet...',
      subtitle: 'Loading',
      isCompleted: false,
    };
  if (!nearestOutlet?.outlet)
    return {
      title: 'Pilih Alamat',
      subtitle: 'Belum ada outlet',
      isCompleted: false,
    };
  if (!nearestOutlet.isWithinRange)
    return {
      title: 'Outlet Tidak Tersedia',
      subtitle: 'Di luar jangkauan',
      isCompleted: false,
    };
  return {
    title: nearestOutlet.outlet.name,
    subtitle: `${nearestOutlet.distance} km`,
    isCompleted: true,
  };
}
