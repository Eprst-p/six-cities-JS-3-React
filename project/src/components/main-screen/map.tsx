/* eslint-disable no-console */
import 'leaflet/dist/leaflet.css';
import {Icon, Marker} from 'leaflet';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/useMap';
import {offerType, offerTypes} from '../../types/offer-types';

type MapProps = {
  chosenOffer: offerType | undefined;
  offers: offerTypes;
}

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

function Map({chosenOffer, offers} : MapProps): JSX.Element {
  const city =  chosenOffer?.city

  const mapRef = useRef(null);
  const map = useMap(mapRef, city, chosenOffer);

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

  return (
    <div
      style={{height: '794px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
