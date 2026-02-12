export interface Address {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    userId?: string;
}

export interface ServiceOption {
    name: string;
    icon: string;
    price: string;
    desc: string;
}

export interface OrderFormData {
    selectedService: string;
    selectedTime: string;
    selectedDate: string;
    selectedAddressId: string | null;
}
