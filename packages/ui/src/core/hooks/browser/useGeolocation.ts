import { useEffect, useState } from 'react';

export interface GeolocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

const initial: GeolocationState = {
  loading: true,
  accuracy: null,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: null,
  longitude: null,
  speed: null,
  timestamp: null,
  error: null,
};

/** Subscribe to the device's geolocation. Watches continuously by default. */
export const useGeolocation = (
  options: PositionOptions = {},
  watch = true,
): GeolocationState => {
  const [state, setState] = useState<GeolocationState>(initial);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }
    const onSuccess = (pos: GeolocationPosition) => {
      const c = pos.coords;
      setState({
        loading: false,
        accuracy: c.accuracy,
        altitude: c.altitude,
        altitudeAccuracy: c.altitudeAccuracy,
        heading: c.heading,
        latitude: c.latitude,
        longitude: c.longitude,
        speed: c.speed,
        timestamp: pos.timestamp,
        error: null,
      });
    };
    const onError = (error: GeolocationPositionError) => {
      setState((s) => ({ ...s, loading: false, error }));
    };

    if (watch) {
      const id = navigator.geolocation.watchPosition(onSuccess, onError, options);
      return () => navigator.geolocation.clearWatch(id);
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, JSON.stringify(options)]);

  return state;
};
