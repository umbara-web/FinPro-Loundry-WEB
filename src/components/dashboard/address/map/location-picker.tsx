'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Loader2, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const MapView = dynamic(() => import('./map-view'), {
  ssr: false,
  loading: () => (
    <div className='flex aspect-video w-full items-center justify-center rounded-md border bg-slate-100 dark:bg-slate-800'>
      <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
    </div>
  ),
});

export type ResolvedAddress = {
  fullAddress?: string;
  city?: string;
  postalCode?: string;
};

type LocationPickerProps = {
  latitude?: number | null;
  longitude?: number | null;
  onLocationSelect: (lat: number, lng: number) => void;
  onAddressChange: (addr: ResolvedAddress) => void;
  error?: string;
};

type LocationPickerState = {
  latText: string;
  lngText: string;
  center: [number, number];
  loadingAddress: boolean;
};

type LocationPickerHandlers = {
  handleMapSelect: (lat: number, lng: number) => Promise<void>;
  handleCurrentLocation: () => void;
  handleLatChange: (value: string) => void;
  handleLngChange: (value: string) => void;
};

function toStringOrEmpty(value?: number | null): string {
  return typeof value === 'number' ? value.toString() : '';
}

function getCenter(
  latitude?: number | null,
  longitude?: number | null
): [number, number] {
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    return [latitude, longitude];
  }
  return [-6.2088, 106.8456]; // Jakarta
}

function parseNumber(value: string): number | null {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function useReverseGeocode(onAddressChange: (addr: ResolvedAddress) => void): {
  loading: boolean;
  fetchAddress: (lat: number, lng: number) => Promise<void>;
} {
  const [loading, setLoading] = useState(false);

  const fetchAddress = useCallback(
    async (lat: number, lng: number) => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/reverse-geocode`, {
          params: { lat, lon: lng },
        });
        onAddressChange(res.data as ResolvedAddress);
      } catch (error: any) {
        console.error(
          'reverse-geocode error',
          error?.response?.data || error?.message || error
        );
        toast.error('Gagal mengambil detail alamat');
      } finally {
        setLoading(false);
      }
    },
    [onAddressChange]
  );

  return { loading, fetchAddress };
}

function useLocationPickerLogic(
  props: LocationPickerProps
): [LocationPickerState, LocationPickerHandlers] {
  const [latText, setLatText] = useState(toStringOrEmpty(props.latitude));
  const [lngText, setLngText] = useState(toStringOrEmpty(props.longitude));
  const center = getCenter(props.latitude, props.longitude);
  const { loading, fetchAddress } = useReverseGeocode(props.onAddressChange);

  useEffect(() => {
    setLatText(toStringOrEmpty(props.latitude));
    setLngText(toStringOrEmpty(props.longitude));
  }, [props.latitude, props.longitude]);

  const handleMapSelect = useCallback(
    async (lat: number, lng: number) => {
      setLatText(lat.toString());
      setLngText(lng.toString());
      props.onLocationSelect(lat, lng);
      await fetchAddress(lat, lng);
    },
    [fetchAddress, props]
  );

  const handleCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Browser tidak mendukung geolokasi');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => handleMapSelect(coords.latitude, coords.longitude),
      () => toast.error('Gagal mengambil lokasi')
    );
  }, [handleMapSelect]);

  const handleLatChange = (value: string) => {
    setLatText(value);
    const lat = parseNumber(value);
    const lng = parseNumber(lngText);
    if (lat != null && lng != null) {
      handleMapSelect(lat, lng);
    }
  };

  const handleLngChange = (value: string) => {
    setLngText(value);
    const lat = parseNumber(latText);
    const lng = parseNumber(value);
    if (lat != null && lng != null) {
      handleMapSelect(lat, lng);
    }
  };

  return [
    {
      latText,
      lngText,
      center,
      loadingAddress: loading,
    },
    {
      handleMapSelect,
      handleCurrentLocation,
      handleLatChange,
      handleLngChange,
    },
  ];
}

type MapSectionProps = {
  center: [number, number];
  onSelect: (lat: number, lng: number) => Promise<void>;
  onCurrentLocation: () => void;
};

function MapSection({ center, onSelect, onCurrentLocation }: MapSectionProps) {
  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-md border'>
      <MapView center={center} onLocationSelect={onSelect} />
      <div className='absolute right-4 bottom-4 z-600'>
        <Button
          type='button'
          variant='default'
          size='sm'
          className='cursor-pointer shadow-md'
          onClick={(event) => {
            event.stopPropagation();
            onCurrentLocation();
          }}
        >
          <MapPin className='mr-2 h-4 w-4' />
          Lokasi Saya
        </Button>
      </div>
    </div>
  );
}

type LatLngInputsProps = {
  latText: string;
  lngText: string;
  onLatChange: (value: string) => void;
  onLngChange: (value: string) => void;
};

function LatLngInputs({
  latText,
  lngText,
  onLatChange,
  onLngChange,
}: LatLngInputsProps) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='space-y-1'>
        <Label className='text-muted-foreground text-xs'>Latitude</Label>
        <Input
          value={latText}
          onChange={(event) => onLatChange(event.target.value)}
          placeholder='-6.200000'
        />
      </div>
      <div className='space-y-1'>
        <Label className='text-muted-foreground text-xs'>Longitude</Label>
        <Input
          value={lngText}
          onChange={(event) => onLngChange(event.target.value)}
          placeholder='106.816666'
        />
      </div>
    </div>
  );
}

type HelperTextProps = {
  loadingAddress: boolean;
  error?: string;
};

function HelperText({ loadingAddress, error }: HelperTextProps) {
  if (loadingAddress) {
    return (
      <p className='text-muted-foreground text-xs'>
        Mengambil detail alamat dari koordinat...
      </p>
    );
  }
  if (error) {
    return <p className='text-destructive text-sm font-medium'>{error}</p>;
  }
  return null;
}

export function LocationPicker(props: LocationPickerProps) {
  const [state, handlers] = useLocationPickerLogic(props);

  return (
    <div className='space-y-3'>
      <Label>Pinpoint Lokasi</Label>
      <MapSection
        center={state.center}
        onSelect={handlers.handleMapSelect}
        onCurrentLocation={handlers.handleCurrentLocation}
      />
      <LatLngInputs
        latText={state.latText}
        lngText={state.lngText}
        onLatChange={handlers.handleLatChange}
        onLngChange={handlers.handleLngChange}
      />
      <HelperText loadingAddress={state.loadingAddress} error={props.error} />
    </div>
  );
}
