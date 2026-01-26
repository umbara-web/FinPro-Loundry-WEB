import { useState, useEffect } from 'react';

const LOCATION_PERMISSION_KEY = 'freshlaundry_location_asked';

export function useLocationPermission() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      // 1. Check if permission was already granted in previous timeline/session
      const storedStatus = localStorage.getItem(LOCATION_PERMISSION_KEY);

      if (storedStatus === 'granted') {
        // Double check actual browser permission if possible
        if ('permissions' in navigator) {
          try {
            const status = await navigator.permissions.query({
              name: 'geolocation',
            });
            if (status.state === 'granted') return;
            if (status.state === 'denied') return;
          } catch (e) {}
        } else {
          return;
        }
      }

      // 2. Check browser permission state
      if ('permissions' in navigator) {
        try {
          const result = await navigator.permissions.query({
            name: 'geolocation',
          });

          if (result.state === 'granted') {
            localStorage.setItem(LOCATION_PERMISSION_KEY, 'granted');
            setIsOpen(false);
          } else if (result.state === 'denied') {
            setIsOpen(false);
          } else {
            setTimeout(() => setIsOpen(true), 1500);
          }
        } catch (error) {
          // Fallback for browsers that support geoposition but not permissions API
          if (!storedStatus || storedStatus !== 'granted') {
            setTimeout(() => setIsOpen(true), 1500);
          }
        }
      } else {
        // Fallback for no permissions API
        if (!storedStatus || storedStatus !== 'granted') {
          setTimeout(() => setIsOpen(true), 1500);
        }
      }
    };

    checkPermission();
  }, []);

  const handleAllow = async () => {
    setIsLoading(true);
    setPermissionError(false);
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Store location in localStorage for later use
            localStorage.setItem(
              'freshlaundry_user_location',
              JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: Date.now(),
              })
            );
            localStorage.setItem(LOCATION_PERMISSION_KEY, 'granted');
            setIsOpen(false);
            setIsLoading(false);
          },
          (error) => {
            // Instead of logging, show error state in modal
            setPermissionError(true);
            setIsLoading(false);
          }
        );
      } else {
        localStorage.setItem(LOCATION_PERMISSION_KEY, 'unsupported');
        setIsOpen(false);
        setIsLoading(false);
      }
    } catch (error) {
      setPermissionError(true);
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(LOCATION_PERMISSION_KEY, 'dismissed');
    setIsOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return {
    isOpen,
    isLoading,
    permissionError,
    handleAllow,
    handleDismiss,
    handleRefresh,
  };
}
