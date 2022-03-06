/* eslint-disable no-console */
import {useEffect, useState, MutableRefObject} from 'react';
import {offerType, offerTypes} from '../types/offer-types';
import {Map, Marker, LayerGroup} from 'leaflet';
import {defaultPin, chosenPin} from '../settings/map-settings';
import leaflet from 'leaflet';

function useRoomMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  chosenOffer: offerType | undefined,
  offers: offerTypes,
): Map | null {

  const [map, setMap] = useState<Map | null>(null);

  const createRoomMap = () => {
    if (mapRef.current !== null && chosenOffer !== undefined) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: chosenOffer.location.latitude,
          lng: chosenOffer.location.longitude,
        },
        zoom: chosenOffer.location.zoom,
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

  const setRoomMarkers = (viewedMap: Map):LayerGroup => {
    const groupMarkers = new LayerGroup();

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      });
      marker
        .setIcon(defaultPin)
        .addTo(groupMarkers)
    });
    if (chosenOffer) {
      const  orangeMarker = new Marker({
        lat: chosenOffer.location.latitude,
        lng: chosenOffer.location.longitude
      });
      orangeMarker
        .setIcon(chosenPin)
        .addTo(groupMarkers)
    }
    groupMarkers.addTo(viewedMap);
    return groupMarkers;
  };

  useEffect(() => {
    let groupMarkers: LayerGroup;
    if (map === null) {
      createRoomMap();
    }
    if (map) {
      groupMarkers = setRoomMarkers(map);
    }
    return () => {
        map?.removeLayer(groupMarkers);
    };
  }, [map, offers]);

  return map;
};

export default useRoomMap;
