import {useEffect, useState, MutableRefObject} from 'react';
import {Icon, Marker, Map} from 'leaflet';
import {City} from '../types/city';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {offerType, offerTypes} from '../types/offer-types';


const defaultPin = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [25, 35],
  iconAnchor: [20, 35]
});

const chosenPin = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [35, 45],
  iconAnchor: [20, 35]
});

type useMapMarkersProps = {
  chosenOffer: offerType | undefined;
  offers: offerTypes;
  map: Map | null;
}

function useMapMarkers({chosenOffer, offers, map}: useMapMarkersProps): void {

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude
        });

        marker
          .setIcon(
            chosenOffer !== undefined  && offer.id === chosenOffer.id
              ? chosenPin
              : defaultPin
          )
          .addTo(map);
      });
    }
  }, [map, offers, chosenOffer]);

}

export default useMapMarkers;
