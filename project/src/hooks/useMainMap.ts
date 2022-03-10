/* eslint-disable no-console */
import {useEffect, useState, MutableRefObject} from 'react';
import {offerType, offerTypes} from '../types/offer-types';
import {Map, Marker, LayerGroup} from 'leaflet';
import {City} from '../types/city';
import {defaultPin, chosenPin} from '../settings/map-settings';
import leaflet from 'leaflet';

function useMainMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  chosenOffer: offerType | undefined,
  offers: offerTypes,
): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const city: City | undefined = offers[0].city;

  const createMainMap = () => {
    if (mapRef.current !== null) {
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
    };
  };

  const moveMapToCity = (newCity: City | undefined, viewedMap: Map) :void => {
    if (newCity) {
      viewedMap.flyTo({lat: newCity.location.latitude, lng: newCity.location.longitude}, newCity.location.zoom);
    }
  };

  const setMainMarkers = (viewedMap: Map):LayerGroup => {
    const groupMarkers = new LayerGroup();
    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      });

      marker
        .setIcon(
          chosenOffer !== undefined  && offer.id === chosenOffer.id
            ? chosenPin
            : defaultPin
        )
        .addTo(groupMarkers)
    });
    groupMarkers.addTo(viewedMap);
    return groupMarkers;
  };

  useEffect(() => {
    let groupMarkers: LayerGroup;
    if (map === null) {
      createMainMap();
    }
    if (map) {
      moveMapToCity(city, map);
      groupMarkers = setMainMarkers(map);
    }
    return () => {
        map?.removeLayer(groupMarkers);
    };
  }, [map, offers]);

  return map;
};

export default useMainMap;
