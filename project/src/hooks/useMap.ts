/* eslint-disable no-console */
import {useEffect, useState, MutableRefObject} from 'react';
import {offerType, offerTypes} from '../types/offer-types';
import {Map, Icon, Marker, LayerGroup} from 'leaflet';
import {City} from '../types/city';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultPin = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [25, 35],
  iconAnchor: [20, 35]
});

const chosenPin = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [25, 35],
  iconAnchor: [20, 35]
});

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City | undefined,
  chosenOffer: offerType | undefined,
  offers: offerTypes,
): Map | null {

  /*console.log('city:', city);
  console.log('chosenOffer:',chosenOffer);
  console.log('offers:',offers);*/

  const [map, setMap] = useState<Map | null>(null);

  const createMap = () => {
      if (mapRef.current !== null && city !== undefined) {
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
  };

  const updateMap = (newCity: City | undefined, viewedMap: Map) :void => {
    if (newCity) {
      viewedMap.flyTo({lat: newCity.location.latitude, lng: newCity.location.longitude}, newCity.location.zoom);
    }
  };

  const setMarkers = (viewedMap: Map):LayerGroup => {
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
    if (map === null) {
      createMap();
    }
    let groupMarkers: LayerGroup;
    if (map) {
      updateMap(city, map);
      groupMarkers = setMarkers(map);
    }
    return () => {
        map?.removeLayer(groupMarkers);
    };
  }, [offers]);

  return map;
}

export default useMap;
