'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import SidebarDashboard from '@/app/admin/allorder/components/mainsidebar';
import { OutletForm } from '@/app/admin/outlet/components/OutletForm';
import { useOutletForm } from './hooks/useOutletForm';

export default function NewOutletPage() {
    const router = useRouter();
    const { createOutlet, loading } = useOutletForm();

    return (
        <div className="flex bg-[#101922] min-h-screen text-white">
            <SidebarDashboard />
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Kembali
                    </button>

                    <h1 className="text-3xl font-black mb-2">Tambah Outlet Baru</h1>
                    <p className="text-gray-400 mb-8">Isi formulir di bawah ini untuk menambahkan cabang outlet laundry baru.</p>

                    <div className="bg-[#1C252E] rounded-2xl border border-gray-800 p-8 shadow-xl">
                        <OutletForm
                            onSubmit={createOutlet}
                            isLoading={loading}
                            onCancel={() => router.back()}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
