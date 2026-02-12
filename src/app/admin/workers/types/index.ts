export interface Worker {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'Admin Outlet' | 'Pekerja' | 'Driver';
    outlet: string;
    status: 'Active' | 'Inactive';
}

export interface WorkerFormData {
    name: string;
    email: string;
    phone: string;
    role: 'Admin Outlet' | 'Pekerja' | 'Driver';
    outlet: string;
    status: 'Active' | 'Inactive';
}

export const WORKER_ROLES = ['Admin Outlet', 'Pekerja', 'Driver'];
export const WORKER_STATUSES = ['Active', 'Inactive'];
