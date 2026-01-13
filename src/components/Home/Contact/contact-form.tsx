'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900'>
      <h2 className='mb-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white'>
        Kirimkan pesan kepada kami
      </h2>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            label='Nama Lengkap'
            name='fullName'
            type='text'
            placeholder='Jane Doe'
            value={formData.fullName}
            onChange={handleChange}
          />
          <FormField
            label='Alamat Email'
            name='email'
            type='email'
            placeholder='jane@example.com'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            label='Nomor Telp/HP (Optional)'
            name='phone'
            type='tel'
            placeholder='+1 (555) 000-0000'
            value={formData.phone}
            onChange={handleChange}
          />
          <SelectField
            label='Subject'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <TextAreaField
          label='Keterangan Anda'
          name='message'
          placeholder='Bagaimana kami dapat membantu Anda hari ini?'
          value={formData.message}
          onChange={handleChange}
        />

        <div className='pt-2'>
          <button
            type='submit'
            className='inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-8 font-bold text-white shadow-sm transition-colors hover:scale-105 hover:bg-slate-300 hover:text-black md:w-auto'
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className='flex flex-col gap-2'>
      <span className='text-sm font-semibold text-slate-900 dark:text-slate-200'>
        {label}
      </span>
      <input
        className='bg-background-light focus:border-primary focus:ring-primary/50 h-12 w-full rounded-lg border border-[#cfd9e7] px-4 text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white'
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <label className='flex flex-col gap-2'>
      <span className='text-sm font-semibold text-slate-900 dark:text-slate-200'>
        {label}
      </span>
      <div className='relative'>
        <select
          className='bg-background-light focus:border-primary focus:ring-primary/50 h-12 w-full appearance-none rounded-lg border border-[#cfd9e7] px-4 pr-10 text-slate-900 transition-all focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white'
          name={name}
          value={value}
          onChange={onChange}
        >
          <option disabled value=''>
            Select a topic
          </option>
          <option value='order'>Order Issue</option>
          <option value='general'>General Inquiry</option>
          <option value='partner'>Partnership</option>
        </select>
        <ChevronDown className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-500' />
      </div>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <label className='flex flex-col gap-2'>
      <span className='text-sm font-semibold text-slate-900 dark:text-slate-200'>
        {label}
      </span>
      <textarea
        className='bg-background-light focus:border-primary focus:ring-primary/50 h-32 w-full resize-y rounded-lg border border-[#cfd9e7] p-4 text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
