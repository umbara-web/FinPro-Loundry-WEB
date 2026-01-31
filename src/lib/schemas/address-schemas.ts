import { z } from 'zod';

export const addressSchema = z.object({
  label: z.string().min(1, 'Label alamat wajib diisi (contoh: Rumah, Kantor)'),
  recipientName: z.string().min(1, 'Nama penerima wajib diisi'),
  recipientPhone: z
    .string()
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(15, 'Nomor telepon maksimal 15 digit')
    .regex(/^(\+62|62|0)[0-9]+$/, 'Format nomor telepon tidak valid'),
  fullAddress: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
  city: z.string().min(1, 'Kota/Kabupaten wajib diisi'),
  postalCode: z.string().min(5, 'Kode pos minimal 5 digit'),
  notes: z.string().optional(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  isPrimary: z.boolean(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
