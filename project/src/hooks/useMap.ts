import {useEffect, useState, MutableRefObject} from 'react';
import {offerType} from '../types/offer-types';
import {Map} from 'leaflet';
import {City} from '../types/city';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City | undefined,
  chosenOffer: offerType | undefined,
): Map | null {

  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null && city !== undefined) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, city, chosenOffer]);

  return map;
}

export default useMap;
