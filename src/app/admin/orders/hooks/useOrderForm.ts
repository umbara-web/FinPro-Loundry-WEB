import { useState, useEffect } from 'react';
import { Address } from '@/app/admin/orders/types';

export const useOrderForm = (addresses: Address[]) => {
    const [selectedService, setSelectedService] = useState('Cuci & Lipat');
    const [selectedTime, setSelectedTime] = useState('10:00 - 12:00');
    const [selectedDate, setSelectedDate] = useState('2023-10-25');
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

    // Auto-select first address if none selected
    useEffect(() => {
        if (selectedAddressId !== null) return;
        if (addresses.length > 0) {
            setSelectedAddressId(addresses[0].id);
        }
    }, [addresses, selectedAddressId]);

    return {
        selectedService,
        setSelectedService,
        selectedTime,
        setSelectedTime,
        selectedDate,
        setSelectedDate,
        selectedAddressId,
        setSelectedAddressId,
    };
};
