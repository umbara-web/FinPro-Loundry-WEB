import { useState } from 'react';
import { Address } from '../types';

interface AddressFormProps {
    onSuccess: (address: Address) => void;
    onClose: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSuccess, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const storedNow = localStorage.getItem('addresses');
            const curr = storedNow ? JSON.parse(storedNow) : [];
            if (Array.isArray(curr) && curr.length >= 3) {
                setError('Maksimal 3 alamat. Hapus alamat lama untuk menambah yang baru.');
                setIsLoading(false);
                return;
            }

            const newId = Date.now() + Math.floor(Math.random() * 1000);

            const newAddress: Address = {
                id: newId.toString(),
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode
            };

            onSuccess(newAddress);

            setFormData({
                name: '',
                phone: '',
                address: '',
                city: '',
                postalCode: ''
            });
        } catch (err) {
            setError('Terjadi kesalahan saat menyimpan alamat');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Informasi Alamat</h2>
                <p className="text-gray-400 text-sm">Masukkan detail alamat untuk penjemputan laundry.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Nama Lengkap</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        className="w-full bg-[#121212] border border-gray-700 rounded-xl p-4 text-sm focus:outline-none focus:border-[#4FD1C5]"
                        required
                    />
                </div>

                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">No. Telepon</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Masukkan nomor telepon"
                        className="w-full bg-[#121212] border border-gray-700 rounded-xl p-4 text-sm focus:outline-none focus:border-[#4FD1C5]"
                        required
                    />
                </div>

                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Alamat Lengkap</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Masukkan alamat lengkap (jalan, nomor rumah, rt/rw)"
                        rows={4}
                        className="w-full bg-[#121212] border border-gray-700 rounded-xl p-4 text-sm focus:outline-none focus:border-[#4FD1C5] resize-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Kota</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Masukkan kota"
                            className="w-full bg-[#121212] border border-gray-700 rounded-xl p-4 text-sm focus:outline-none focus:border-[#4FD1C5]"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Kode Pos</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Masukkan kode pos"
                            className="w-full bg-[#121212] border border-gray-700 rounded-xl p-4 text-sm focus:outline-none focus:border-[#4FD1C5]"
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-[#4FD1C5] text-black px-6 py-4 rounded-xl font-bold hover:bg-[#3FB5A8] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Menyimpan...' : 'Simpan Alamat'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-4 border border-gray-700 rounded-xl font-bold hover:bg-gray-800 transition"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};
