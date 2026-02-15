'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Package, Scale, DollarSign, Hash, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import api from '@/src/app/utils/api';
import { toast } from 'sonner';

interface OrderItem {
    id: string;
    itemName: string;
    price: number;
    unit: string;
    qty: number;
    laundry_item: {
        id: string;
        name: string;
        category: string;
        unit: string;
        status: string;
    };
}

interface OrderDetail {
    id: string;
    total_weight: number;
    price_total: number;
    status: string;
    created_at: string;
    pickup_request: {
        id: string;
        status: string;
        customer: { name: string; phone: string; email: string };
        customer_address: { address: string; city: string };
    };
    outlet: { name: string };
    order_item: OrderItem[];
}

interface LaundryItem {
    id: string;
    name: string;
    category: string;
    unit: string;
    status: string;
}

interface ItemInput {
    laundryItemId: string;
    name: string;
    qty: number;
    matched: boolean; // exists in order
}

const mapCategory = (cat: string) => {
    switch (cat) {
        case 'CUCI_SETRIKA': return 'Cuci Setrika';
        case 'SATUAN': return 'Satuan';
        case 'DRY_CLEAN': return 'Dry Clean';
        default: return cat;
    }
};

const mapUnit = (unit: string) => {
    switch (unit) {
        case 'KG': return 'kg';
        case 'PCS': return 'pcs';
        case 'M2': return 'm²';
        default: return unit;
    }
};

export default function ProsesOrderPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId') || '';
    const status = searchParams.get('status') || '';

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [allItems, setAllItems] = useState<LaundryItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Item qty inputs keyed by laundry item ID
    const [itemInputs, setItemInputs] = useState<Record<string, number>>({});

    // Manual fields
    const [weightKg, setWeightKg] = useState<string>('');

    // Auto-calculated: weight (kg) × Rp 6.000
    const totalPrice = useMemo(() => {
        const w = parseFloat(weightKg) || 0;
        return w * 6000;
    }, [weightKg]);

    // --- Mock/Gimmick data for preview ---
    const MOCK_ORDER: OrderDetail = {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        total_weight: 5.5,
        price_total: 85000,
        status: 'CREATED',
        created_at: new Date().toISOString(),
        pickup_request: {
            id: 'pr-001',
            status: 'ARRIVED_OUTLET',
            customer: { name: 'Budi Santoso', phone: '081234567890', email: 'budi@email.com' },
            customer_address: { address: 'Jl. Merdeka No. 45, Blok C2', city: 'Jakarta Selatan' },
        },
        outlet: { name: 'FreshClean - Cabang Kemang' },
        order_item: [
            { id: 'oi-1', itemName: 'Kemeja', price: 8000, unit: 'PCS', qty: 5, laundry_item: { id: 'mock-item-1', name: 'Kemeja', category: 'CUCI_SETRIKA', unit: 'PCS', status: 'ACTIVE' } },
            { id: 'oi-2', itemName: 'Celana Panjang', price: 10000, unit: 'PCS', qty: 3, laundry_item: { id: 'mock-item-2', name: 'Celana Panjang', category: 'CUCI_SETRIKA', unit: 'PCS', status: 'ACTIVE' } },
            { id: 'oi-3', itemName: 'Bed Cover', price: 25000, unit: 'PCS', qty: 1, laundry_item: { id: 'mock-item-5', name: 'Bed Cover', category: 'SATUAN', unit: 'PCS', status: 'ACTIVE' } },
        ],
    };

    const MOCK_ALL_ITEMS: LaundryItem[] = [
        { id: 'mock-item-1', name: 'Kemeja', category: 'CUCI_SETRIKA', unit: 'PCS', status: 'ACTIVE' },
        { id: 'mock-item-2', name: 'Celana Panjang', category: 'CUCI_SETRIKA', unit: 'PCS', status: 'ACTIVE' },
        { id: 'mock-item-3', name: 'Kaos', category: 'CUCI_SETRIKA', unit: 'PCS', status: 'ACTIVE' },
        { id: 'mock-item-4', name: 'Jaket', category: 'DRY_CLEAN', unit: 'PCS', status: 'ACTIVE' },
        { id: 'mock-item-5', name: 'Bed Cover', category: 'SATUAN', unit: 'PCS', status: 'ACTIVE' },
        { id: 'mock-item-6', name: 'Selimut', category: 'SATUAN', unit: 'PCS', status: 'ACTIVE' },
        { id: 'mock-item-7', name: 'Jas / Blazer', category: 'DRY_CLEAN', unit: 'PCS', status: 'ACTIVE' },
        { id: 'mock-item-8', name: 'Cuci Reguler', category: 'CUCI_SETRIKA', unit: 'KG', status: 'ACTIVE' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (!orderId) {
                    // No orderId — use mock data for preview
                    setOrder(MOCK_ORDER);
                    setAllItems(MOCK_ALL_ITEMS);
                    return;
                }

                const [orderRes, itemsRes] = await Promise.all([
                    api.get(`/api/admin/orders/${orderId}`),
                    api.get('/api/items'),
                ]);

                const orderData = orderRes.data;
                const items = Array.isArray(itemsRes.data) ? itemsRes.data : [];

                if (orderData && items.length > 0) {
                    setOrder(orderData);
                    setAllItems(items);
                } else {
                    // API returned empty — fallback to mock
                    setOrder(orderData || MOCK_ORDER);
                    setAllItems(items.length > 0 ? items : MOCK_ALL_ITEMS);
                }
            } catch (error) {
                console.error('Failed to fetch data, using mock data:', error);
                // Fallback to mock data on error
                setOrder(MOCK_ORDER);
                setAllItems(MOCK_ALL_ITEMS);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [orderId]);

    // Build comparison data: all DB items with matched flag
    const comparisonItems: ItemInput[] = useMemo(() => {
        if (!order) return [];

        const orderItemIds = new Set(order.order_item.map((oi) => oi.laundry_item.id));

        return allItems
            .filter((item) => item.status === 'ACTIVE')
            .map((item) => ({
                laundryItemId: item.id,
                name: item.name,
                qty: itemInputs[item.id] || 0,
                matched: orderItemIds.has(item.id),
            }));
    }, [allItems, order, itemInputs]);

    // Total qty
    const totalQty = useMemo(() => {
        return Object.values(itemInputs).reduce((sum, q) => sum + (q || 0), 0);
    }, [itemInputs]);

    const handleQtyChange = (itemId: string, value: string) => {
        const num = parseInt(value) || 0;
        setItemInputs((prev) => ({ ...prev, [itemId]: num }));
    };

    const statusLabel = (s: string) => {
        switch (s) {
            case 'WAITING_DRIVER': return 'Waiting Driver';
            case 'DRIVER_ASSIGNED': return 'Driver Assigned';
            case 'PICKED_UP': return 'Picked Up';
            case 'ARRIVED_OUTLET': return 'Arrived Outlet';
            case 'CANCELLED': return 'Cancelled';
            default: return s;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400">Memuat data order...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-gray-400 mb-4">Order tidak ditemukan</p>
                    <button onClick={() => router.back()} className="text-teal-400 hover:underline">
                        Kembali
                    </button>
                </div>
            </div>
        );
    }


    const handleProcessOrder = async () => {
        if (!order) return;

        try {
            const w = parseFloat(weightKg);
            if (isNaN(w) || w <= 0) {
                toast.error('Berat harus diisi (lebih dari 0)');
                return;
            }

            const payload = {
                items: Object.entries(itemInputs).map(([id, qty]) => ({
                    laundry_item_id: id,
                    qty: qty
                })).filter(i => i.qty > 0), // Only send items with qty > 0? Or all? 
                // The service updates matches. If qty is 0, it updates to 0. 
                // Let's send all inputs that are defined.
                totalWeight: w
            };

            await api.post(`/api/outlet-admin/orders/${orderId}/process`, payload);

            toast.success('Order berhasil diproses!');
            router.push('/outletadmin/dashboard');
        } catch (error: any) {
            console.error('Failed to process order:', error);
            toast.error(error.response?.data?.message || 'Gagal memproses order');
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] p-8 font-sans text-white">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push('/outletadmin/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Kembali ke Dashboard
                </button>

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">
                            Proses Order
                        </h1>
                        <p className="text-sm text-gray-500">
                            Detail dan verifikasi pesanan #{orderId.substring(0, 8).toUpperCase()}
                        </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold border
                        ${status === 'WAITING_DRIVER' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                            status === 'DRIVER_ASSIGNED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                status === 'PICKED_UP' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                    status === 'ARRIVED_OUTLET' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        ● {statusLabel(status)}
                    </span>
                </div>
            </div>

            {/* Order Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Customer Info */}
                <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 p-5">
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Pelanggan</h3>
                    <p className="text-white font-bold">{order.pickup_request?.customer?.name || '-'}</p>
                    <p className="text-gray-400 text-sm">{order.pickup_request?.customer?.phone || '-'}</p>
                    <p className="text-gray-500 text-xs mt-1">{order.pickup_request?.customer_address?.address || '-'}</p>
                </div>

                {/* Order Info */}
                <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 p-5">
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Info Order</h3>
                    <p className="text-white font-bold text-sm font-mono">#{order.id.substring(0, 8).toUpperCase()}</p>
                    <p className="text-gray-400 text-sm">{order.outlet?.name || '-'}</p>
                    <p className="text-gray-500 text-xs mt-1">
                        {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                {/* Summary Stats */}
                <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 p-5">
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Ringkasan Input</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400 flex items-center gap-2"><Hash size={14} /> Total Qty</span>
                            <span className="text-white font-bold">{totalQty} item</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400 flex items-center gap-2"><Scale size={14} /> Berat</span>
                            <span className="text-white font-bold">{weightKg || '0'} kg</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400 flex items-center gap-2"><DollarSign size={14} /> Total Harga</span>
                            <span className="text-teal-400 font-bold">Rp {totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Item Comparison Section */}
            <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 overflow-hidden mb-8">
                <div className="p-5 border-b border-gray-800">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Package size={20} className="text-teal-400" />
                        Perbandingan Item
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        Item yang dipesan vs item yang tersedia di database. Masukkan qty untuk setiap item.
                    </p>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-[#252525] text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="px-5 py-3 w-12">Status</th>
                            <th className="px-5 py-3">Nama Item</th>
                            <th className="px-5 py-3 w-28">Kategori</th>
                            <th className="px-5 py-3 w-20">Unit</th>
                            <th className="px-5 py-3 w-24 text-center">Qty Pesanan</th>
                            <th className="px-5 py-3 w-28 text-center">Qty Input</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {comparisonItems.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    Tidak ada item ditemukan
                                </td>
                            </tr>
                        ) : (
                            comparisonItems.map((item) => {
                                // Find matching order item for qty
                                const orderItem = order.order_item.find(
                                    (oi) => oi.laundry_item.id === item.laundryItemId
                                );
                                const dbItem = allItems.find((i) => i.id === item.laundryItemId);

                                return (
                                    <tr
                                        key={item.laundryItemId}
                                        className={`transition-colors ${item.matched
                                            ? 'bg-teal-500/5 hover:bg-teal-500/10'
                                            : 'hover:bg-[#252525]/50'
                                            }`}
                                    >
                                        {/* Match status */}
                                        <td className="px-5 py-3">
                                            {item.matched ? (
                                                <div className="flex items-center justify-center" title="Ada di pesanan">
                                                    <CheckCircle2 size={18} className="text-teal-400" />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center" title="Tidak ada di pesanan">
                                                    <XCircle size={18} className="text-gray-600" />
                                                </div>
                                            )}
                                        </td>

                                        {/* Item name */}
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${item.matched
                                                    ? 'bg-teal-500/20 text-teal-400'
                                                    : 'bg-gray-700 text-gray-400'
                                                    }`}>
                                                    {item.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-medium ${item.matched ? 'text-white' : 'text-gray-400'}`}>
                                                        {item.name}
                                                    </p>
                                                    {item.matched && (
                                                        <p className="text-[10px] text-teal-400/70">✓ Dalam pesanan</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-5 py-3">
                                            <span className="text-xs text-gray-400">
                                                {dbItem ? mapCategory(dbItem.category) : '-'}
                                            </span>
                                        </td>

                                        {/* Unit */}
                                        <td className="px-5 py-3">
                                            <span className="text-xs text-gray-400">
                                                {dbItem ? mapUnit(dbItem.unit) : '-'}
                                            </span>
                                        </td>

                                        {/* Ordered qty */}
                                        <td className="px-5 py-3 text-center">
                                            {orderItem ? (
                                                <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-xs font-bold">
                                                    {orderItem.qty}
                                                </span>
                                            ) : (
                                                <span className="text-gray-600 text-xs">—</span>
                                            )}
                                        </td>

                                        {/* Qty Input */}
                                        <td className="px-5 py-3">
                                            <input
                                                type="number"
                                                min="0"
                                                value={itemInputs[item.laundryItemId] || ''}
                                                onChange={(e) => handleQtyChange(item.laundryItemId, e.target.value)}
                                                placeholder="0"
                                                className={`w-full bg-[#121212] border rounded-lg px-3 py-2 text-sm text-center focus:outline-none transition-colors ${item.matched
                                                    ? 'border-teal-500/30 focus:border-teal-400 text-white'
                                                    : 'border-gray-700 focus:border-gray-500 text-gray-300'
                                                    }`}
                                            />
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Manual Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Total Qty (Auto) */}
                <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 p-5">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                        <Hash size={14} className="text-teal-400" />
                        Total Qty Item
                    </label>
                    <div className="bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 text-2xl font-bold text-white text-center">
                        {totalQty}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 text-center">Otomatis dari input qty di atas</p>
                </div>

                {/* Weight (Manual) */}
                <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 p-5">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                        <Scale size={14} className="text-blue-400" />
                        Jumlah Berat (kg)
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        placeholder="0.0"
                        className="w-full bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 text-2xl font-bold text-white text-center focus:outline-none focus:border-blue-400 transition-colors"
                    />
                    <p className="text-[10px] text-gray-500 mt-2 text-center">Masukkan berat total dalam kg</p>
                </div>

                {/* Total Price (Manual) */}
                <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 p-5">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                        <DollarSign size={14} className="text-green-400" />
                        Total Harga (Rp)
                    </label>
                    <div className="w-full bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 text-2xl font-bold text-teal-400 text-center">
                        Rp {totalPrice.toLocaleString('id-ID')}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 text-center">Otomatis: berat (kg) × Rp 6.000</p>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 justify-end">
                <button
                    onClick={() => router.push('/outletadmin/dashboard')}
                    className="px-6 py-3 border border-gray-700 rounded-xl font-semibold text-gray-300 hover:bg-gray-800 transition-all text-sm"
                >
                    Batal
                </button>
                <button
                    onClick={handleProcessOrder}
                    className="px-8 py-3 bg-[#4FD1C5] hover:bg-[#3fb9ae] rounded-xl font-bold text-[#121212] transition-all shadow-lg shadow-teal-500/10 text-sm"
                >
                    Simpan & Proses
                </button>
            </div>
        </div>
    );
}
