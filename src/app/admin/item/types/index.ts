export interface LaundryItem {
    id: string;
    name: string;
    category: string;
    price: number; // API returns number, or we convert string to number
    unit: string;
    status: string;
}

export interface ItemFormData {
    name: string;
    category: string;
    price: string;
    unit: string;
    status: string;
}
