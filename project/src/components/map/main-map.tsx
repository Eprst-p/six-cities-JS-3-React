import {useRef} from 'react';
import useMainMap from '../../hooks/useMainMap';
import {offerType, offerTypes} from '../../types/offer-types';
import {MapHeights} from '../../settings/map-settings';

type MainMapProps = {
  chosenOffer: offerType | undefined;
  offers: offerTypes;
}

function MainMap({chosenOffer, offers} : MainMapProps): JSX.Element {

  const mapRef = useRef(null);
  useMainMap(mapRef, chosenOffer, offers);

  return (
    <div
      style={{height: MapHeights.MainMap}}
      ref={mapRef}
    >
    </div>
  );
}

export default MainMap;
