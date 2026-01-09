// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/src/components/ui/dropdown-menu';
// import { ChevronDown, User, Settings, LogOut, CreditCard } from 'lucide-react';
// import Link from 'next/link';
// import { signOut } from 'next-auth/react';
// import type { Session } from 'next-auth';

// interface NavbarUserMenuProps {
//   session: Session;
// }

// export function NavbarUserMenu({ session }: NavbarUserMenuProps) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className='flex cursor-pointer items-center gap-3 rounded-full px-2 py-1 transition-colors outline-none hover:bg-gray-100 dark:hover:bg-gray-800'>
//           <div className='relative h-8 w-8 overflow-hidden rounded-full border border-gray-200 bg-gray-200 dark:border-gray-700'>
//             {session?.user?.image ? (
//               <img
//                 src={session.user.image}
//                 alt={session.user.name || 'User'}
//                 className='h-full w-full object-cover'
//               />
//             ) : (
//               <div className='flex h-full w-full items-center justify-center bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200'>
//                 {session?.user?.name?.charAt(0) || 'U'}
//               </div>
//             )}
//           </div>
//           <span className='hidden max-w-25 truncate text-sm font-semibold text-gray-700 xl:block dark:text-gray-200'>
//             {session?.user?.name || 'User'}
//           </span>
//           <ChevronDown className='h-4 w-4 text-gray-500' />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align='end' className='mt-2 w-56'>
//         <DropdownMenuLabel className='font-normal'>
//           <div className='flex flex-col space-y-1'>
//             <p className='text-sm leading-none font-medium'>
//               {session?.user?.name}
//             </p>
//             <p className='text-muted-foreground text-xs leading-none'>
//               {session?.user?.email}
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem className='cursor-pointer'>
//           <CreditCard className='mr-2 h-4 w-4' />
//           <span>Saldo: Rp 0</span>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem className='cursor-pointer' asChild>
//           <Link href='/dashboard/profile'>
//             <User className='mr-2 h-4 w-4' />
//             <span>My Profile</span>
//           </Link>
//         </DropdownMenuItem>
//         <DropdownMenuItem className='cursor-pointer' asChild>
//           <Link href='/dashboard/settings'>
//             <Settings className='mr-2 h-4 w-4' />
//             <span>Pengaturan</span>
//           </Link>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem
//           className='cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400'
//           onClick={() => signOut({ callbackUrl: '/' })}
//         >
//           <LogOut className='mr-2 h-4 w-4' />
//           <span>Logout</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
