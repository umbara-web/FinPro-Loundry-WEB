'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';

interface ComplaintImageUploadProps {
  images: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMb?: number;
}

export function ComplaintImageUpload({
  images,
  onChange,
  maxFiles = 5,
  maxSizeMb = 2,
}: ComplaintImageUploadProps) {
  const previews = useMemo(
    () => images.map((file) => URL.createObjectURL(file)),
    [images]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const maxBytes = maxSizeMb * 1024 * 1024;

    const validFiles = newFiles.filter((file) => {
      if (file.size > maxBytes) {
        toast.error(`File ${file.name} terlalu besar (maks ${maxSizeMb}MB)`);
        return false;
      }
      return true;
    });

    if (images.length + validFiles.length > maxFiles) {
      toast.error(`Maksimal ${maxFiles} foto yang dapat diupload`);
      return;
    }

    onChange([...images, ...validFiles]);
    // allow selecting the same file again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className='flex flex-col gap-3'>
      <label className='text-sm font-bold text-gray-700 dark:text-gray-300'>
        Foto Bukti (Opsional)
      </label>

      <div className='grid grid-cols-3 gap-4 sm:grid-cols-5'>
        {previews.map((preview, index) => (
          <div
            key={preview}
            className='relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50'
          >
            <img src={preview} alt='preview' className='h-full w-full object-cover' />
            <button
              type='button'
              onClick={() => removeImage(index)}
              className='absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
            >
              <X className='h-3 w-3' />
            </button>
          </div>
        ))}

        {images.length < maxFiles && (
          <label className='flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
            <Upload className='h-6 w-6 text-gray-400' />
            <span className='mt-2 text-center text-xs text-gray-500'>Upload</span>
            <input
              type='file'
              multiple
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      <p className='text-xs text-gray-500'>
        Maksimal {maxFiles} foto (JPG/PNG, maks {maxSizeMb}MB per file)
      </p>
    </div>
  );
}
