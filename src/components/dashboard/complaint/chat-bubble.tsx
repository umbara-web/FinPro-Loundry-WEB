'use client';

import { User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ComplaintMessage } from '@/src/lib/api/complaint-api';
import { User } from '@/src/context/AuthContext';

interface ChatBubbleProps {
  msg: ComplaintMessage;
  currentUser: User | null;
}

export function ChatBubble({ msg, currentUser }: ChatBubbleProps) {
  // Use .id as defined in AuthContext User interface, not .userId
  const isMe = msg.sender_id === currentUser?.id;
  const isStaff =
    msg.sender.role === 'OUTLET_ADMIN' || msg.sender.role === 'SUPER_ADMIN';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-[80%] gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {/* Avatar */}
        <div className='shrink-0'>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              isStaff ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {msg.sender.profile_picture_url ? (
              <img
                src={msg.sender.profile_picture_url}
                alt={msg.sender.name}
                className='h-full w-full rounded-full object-cover'
              />
            ) : (
              <UserIcon className='h-4 w-4' />
            )}
          </div>
        </div>

        {/* Bubble */}
        <div
          className={`group relative rounded-2xl px-4 py-2 ${
            isMe
              ? 'bg-primary text-primary-foreground rounded-tr-none'
              : 'rounded-tl-none border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
          }`}
        >
          {!isMe && (
            <p className='mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400'>
              {msg.sender.name}{' '}
              {isStaff && <span className='text-primary ml-1'>(Admin)</span>}
            </p>
          )}
          <p className='text-sm whitespace-pre-wrap'>{msg.message}</p>
          <p
            className={`mt-1 text-[10px] ${isMe ? 'text-primary-foreground/70' : 'text-gray-400'}`}
          >
            {format(new Date(msg.created_at), 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
}
