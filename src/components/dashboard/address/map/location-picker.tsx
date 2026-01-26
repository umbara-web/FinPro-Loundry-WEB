'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { MapPin, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./map-view'), {
  ssr: false,
  loading: () => (
    <div className='flex aspect-video w-full items-center justify-center rounded-md border bg-slate-100 dark:bg-slate-800'>
      <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
    </div>
  ),
});

interface LocationPickerProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect: (lat: number, lng: number) => void;
  error?: string;
}

export function LocationPicker({
  latitude,
  longitude,
  onLocationSelect,
  error,
}: LocationPickerProps) {
  const [lat, setLat] = useState(latitude?.toString() || '');
  const [lng, setLng] = useState(longitude?.toString() || '');

  // Default to Jakarta if no coordinates provided
  const defaultCenter: [number, number] = [-6.2088, 106.8456];
  const mapCenter: [number, number] =
    latitude && longitude ? [latitude, longitude] : defaultCenter;

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          setLat(newLat.toString());
          setLng(newLng.toString());
          onLocationSelect(newLat, newLng);
        },
        (error) => {
          console.error('Error getting location:', {
            code: error.code,
            message: error.message,
          });

          let errorMessage = 'Gagal mengambil lokasi.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                'Izin lokasi ditolak. Mohon izinkan akses lokasi di browser anda.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Informasi lokasi tidak tersedia.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Waktu permintaan lokasi habis.';
              break;
          }
          toast.error(errorMessage);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      toast.error('Browser tidak mendukung geolokasi.');
    }
  };

  const handleManualChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'lat' | 'lng'
  ) => {
    const value = e.target.value;
    if (type === 'lat') {
      setLat(value);
      const num = parseFloat(value);
      if (!isNaN(num)) onLocationSelect(num, parseFloat(lng) || 0);
    } else {
      setLng(value);
      const num = parseFloat(value);
      if (!isNaN(num)) onLocationSelect(parseFloat(lat) || 0, num);
    }
  };

  useEffect(() => {
    if (latitude) setLat(latitude.toString());
    if (longitude) setLng(longitude.toString());
  }, [latitude, longitude]);

  return (
    <div className='space-y-3'>
      <Label>Pinpoint Lokasi</Label>
      <div className='relative aspect-video w-full overflow-hidden rounded-md border'>
        <MapView
          center={mapCenter}
          onLocationSelect={(newLat, newLng) => {
            setLat(newLat.toString());
            setLng(newLng.toString());
            onLocationSelect(newLat, newLng);
          }}
        />
        <div className='absolute right-4 bottom-4 z-400'>
          <Button
            type='button'
            variant='secondary'
            size='sm'
            className='shadow-md'
            onClick={(e) => {
              e.stopPropagation(); // Prevent map click propagation
              handleCurrentLocation();
            }}
          >
            <MapPin className='mr-2 h-4 w-4' />
            Lokasi Saya
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <Label className='text-muted-foreground text-xs'>Latitude</Label>
          <Input
            value={lat}
            onChange={(e) => handleManualChange(e, 'lat')}
            placeholder='-6.200000'
          />
        </div>
        <div className='space-y-1'>
          <Label className='text-muted-foreground text-xs'>Longitude</Label>
          <Input
            value={lng}
            onChange={(e) => handleManualChange(e, 'lng')}
            placeholder='106.816666'
          />
        </div>
      </div>
      {error && <p className='text-destructive text-sm font-medium'>{error}</p>}
    </div>
  );
}
