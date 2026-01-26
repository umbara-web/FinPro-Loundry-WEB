'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  isDisabled: boolean;
}

export function ChatInput({ onSend, isLoading, isDisabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isDisabled) return;

    onSend(message);
    setMessage('');
  };

  return (
    <div className='border-t border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
      <form onSubmit={handleSubmit} className='flex gap-2'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Tulis pesan...'
          className='focus:border-primary focus:ring-primary flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 focus:ring-1 focus:outline-none dark:border-gray-700 dark:bg-gray-800'
          disabled={isDisabled}
        />
        <button
          type='submit'
          disabled={!message.trim() || isDisabled}
          className='bg-primary hover:bg-primary/90 flex h-10 w-10 items-center justify-center rounded-xl text-white transition-colors disabled:opacity-50'
        >
          {isLoading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Send className='h-4 w-4' />
          )}
        </button>
      </form>
      {isDisabled && !isLoading && (
        <p className='mt-2 text-center text-xs text-gray-500'>
          Anda tidak dapat mengirim pesan saat ini.
        </p>
      )}
    </div>
  );
}
