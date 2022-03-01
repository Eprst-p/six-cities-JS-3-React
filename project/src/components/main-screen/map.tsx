import 'leaflet/dist/leaflet.css';
import {useRef} from 'react';
import useMap from '../../hooks/useMap';
import {offerType} from '../../types/offer-types';

type MapProps = {
  offer: offerType | undefined;
}

function Map({offer} : MapProps): JSX.Element {
  const city =  offer?.city

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  return (
    <div
      style={{height: '794px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
