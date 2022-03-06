/* eslint-disable no-console */
import {useRef} from 'react';
import useMap from '../../hooks/useMap';
import {offerType, offerTypes} from '../../types/offer-types';

type MapProps = {
  chosenOffer: offerType | undefined;
  offers: offerTypes;
}

function Map({chosenOffer, offers} : MapProps): JSX.Element {
  const city =  offers[0].city

  const mapRef = useRef(null);
  useMap(mapRef, city, chosenOffer, offers);

  return (
    <div
      style={{height: '794px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
