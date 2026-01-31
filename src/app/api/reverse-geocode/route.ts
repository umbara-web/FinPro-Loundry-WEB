import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json(
        { message: 'Missing required query params: lat and lon' },
        { status: 400 }
      );
    }

    // Call Nominatim (OpenStreetMap) reverse geocoding
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&addressdetails=1`;

    const res = await fetch(nominatimUrl, {
      headers: {
        // Nominatim requires a valid User-Agent identifying your application
        'User-Agent': 'fresh-laundry-app/1.0 (reverse-geocode)',
      },
      // Avoid caching to reflect latest data
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { message: 'Reverse geocoding failed', detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    const address = data?.address || {};

    // Map to FE shape
    const result = {
      fullAddress: data?.display_name || '',
      city:
        address.city || address.town || address.village || address.county || '',
      postalCode: address.postcode || '',
    };

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {
        message: 'Internal error during reverse geocoding',
        detail: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}
