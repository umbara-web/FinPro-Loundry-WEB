import { Package, Shirt } from 'lucide-react';
import { SERVICES } from '@/app/admin/orders/constants';

interface ServiceDetailProps {
    selectedService: string;
    setSelectedService: (serviceName: string) => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
    selectedService,
    setSelectedService,
}) => {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'package': return <Package size={20} />;
            case 'shirt': return <span className="text-lg">👕</span>; // Fallback or lucide icon equivalent
            case 'tie': return <span className="text-lg">👔</span>;
            default: return <Package size={20} />;
        }
    };

    return (
        <section>
            <h2 className="flex items-center gap-3 text-lg font-semibold mb-5">
                <span className="bg-[#1a2e2c] text-[#4FD1C5] p-2 rounded-lg">
                    <Package size={18} />
                </span>
                3. Detail Layanan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SERVICES.map((service) => (
                    <div
                        key={service.name}
                        onClick={() => setSelectedService(service.name)}
                        className={`bg-[#1E1E1E] p-5 rounded-2xl border-2 cursor-pointer transition ${selectedService === service.name
                            ? 'border-[#4FD1C5]'
                            : 'border-gray-800 hover:border-gray-600'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${selectedService === service.name ? 'bg-[#1a2e2c] text-[#4FD1C5]' : 'bg-gray-800 text-gray-400'}`}>
                            {getIcon(service.icon)}
                        </div>
                        <h3 className="font-bold text-sm">{service.name}</h3>
                        <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                            {service.desc}
                        </p>
                        <div className="mt-6 flex justify-between items-center">
                            <span className="text-[10px] text-gray-500">Mulai dari</span>
                            <span className="text-xs font-bold text-white">
                                {service.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block tracking-wider">
                    Catatan Tambahan{' '}
                    <span className="text-gray-600 font-normal">(Opsional)</span>
                </label>
                <textarea
                    placeholder="Contoh: Tolong pisahkan kemeja putih, kode pagar 1234, atau bel rumah mati."
                    className="w-full bg-[#1E1E1E] border border-gray-800 rounded-2xl p-4 text-xs text-gray-400 focus:outline-none focus:border-[#4FD1C5] min-h-[100px] resize-none"
                />
            </div>
        </section>
    );
};
