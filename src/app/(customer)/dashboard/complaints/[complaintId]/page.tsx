'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

import {
  getComplaintById,
  getMessages,
  sendMessage,
} from '@/src/lib/api/complaint-api';
import { useAuth } from '@/src/context/AuthContext';
import { toast } from 'sonner';
import { ChatBubble } from '@/src/components/dashboard/complaint/chat-bubble';
import { ChatInput } from '@/src/components/dashboard/complaint/chat-input';

export default function ComplaintDetailPage() {
  const { complaintId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch Complaint Details
  const { data: complaint, isLoading: isLoadingComplaint } = useQuery({
    queryKey: ['complaint', complaintId],
    queryFn: () => getComplaintById(complaintId as string),
    enabled: !!complaintId,
  });

  // Fetch Messages
  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['complaint-messages', complaintId],
    queryFn: () => getMessages(complaintId as string),
    enabled: !!complaintId,
    refetchInterval: 5000,
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send Message Mutation
  const sendMutation = useMutation({
    mutationFn: (message: string) =>
      sendMessage(complaintId as string, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['complaint-messages', complaintId],
      });
    },
    onError: () => {
      toast.error('Gagal mengirim pesan');
    },
  });

  if (isLoadingComplaint) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <Loader2 className='text-primary h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (!complaint) return <div>Complaint not found</div>;

  const isClosed =
    complaint.status === 'RESOLVED' || complaint.status === 'REJECTED';

  return (
    <div className='container mx-auto max-w-4xl space-y-6 px-4 py-8'>
      {/* Header & Complaint Info */}
      <div className='space-y-4'>
        <Link
          href='/dashboard/profile'
          className='hover:text-primary flex items-center gap-2 text-sm text-gray-500 transition-colors'
        >
          <ArrowLeft className='h-4 w-4' />
          Kembali ke Profil
        </Link>

        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-start'>
            <div>
              <div className='flex items-center gap-3'>
                <h1 className='text-2xl font-bold'>
                  Komplain #{complaint.id.slice(0, 8)}
                </h1>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    complaint.status === 'OPEN'
                      ? 'bg-blue-100 text-blue-700'
                      : complaint.status === 'IN_REVIEW'
                        ? 'bg-yellow-100 text-yellow-700'
                        : complaint.status === 'RESOLVED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                  }`}
                >
                  {complaint.status.replace('_', ' ')}
                </span>
              </div>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                {complaint.description}
              </p>
            </div>
            <div className='text-right text-sm text-gray-500'>
              <p>Order #{complaint.order?.id.slice(0, 8)}</p>
              <p>
                {format(new Date(complaint.created_at), 'dd MMM yyyy, HH:mm', {
                  locale: idLocale,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className='flex h-150 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
        <div className='border-b border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/50'>
          <h2 className='font-semibold'>Diskusi</h2>
        </div>

        {/* Messages List */}
        <div className='flex-1 space-y-4 overflow-y-auto bg-gray-50/30 p-4 dark:bg-black/20'>
          {isLoadingMessages ? (
            <div className='flex h-full items-center justify-center'>
              <Loader2 className='h-6 w-6 animate-spin text-gray-400' />
            </div>
          ) : messages?.length === 0 ? (
            <div className='flex h-full flex-col items-center justify-center text-sm text-gray-400'>
              <p>Belum ada pesan.</p>
              <p>Ceritakan lebih detail masalah Anda disini.</p>
            </div>
          ) : (
            messages?.map((msg) => (
              <ChatBubble key={msg.id} msg={msg} currentUser={user} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput
          onSend={(msg) => sendMutation.mutate(msg)}
          isLoading={sendMutation.isPending}
          isDisabled={sendMutation.isPending || isClosed || false}
        />
      </div>
    </div>
  );
}
