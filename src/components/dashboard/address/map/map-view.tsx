'use client';

import { useEffect } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ICON_URL = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const ICON_RETINA_URL =
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const SHADOW_URL =
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

if (typeof window !== 'undefined') {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: ICON_RETINA_URL,
    iconUrl: ICON_URL,
    shadowUrl: SHADOW_URL,
  });
}

type MapControllerProps = {
  center: [number, number];
  onLocationSelect: (lat: number, lng: number) => void;
};

function MapController({ center, onLocationSelect }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  useMapEvents({
    click(event) {
      onLocationSelect(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

export type MapViewProps = {
  center: [number, number];
  onLocationSelect: (lat: number, lng: number) => void;
  zoom?: number;
};

export default function MapView({
  center,
  onLocationSelect,
  zoom = 13,
}: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={center} />
      <MapController center={center} onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
