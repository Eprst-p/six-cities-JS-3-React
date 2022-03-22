import {useRef} from 'react';
import useMap from '../../hooks/useMap';
import {offerType, offerTypes} from '../../types/offer-types';
import {MapHeight} from '../../settings/map-settings';
import {MapVariant} from '../../settings/map-settings';


type MapProps = {
  chosenOffer: offerType | undefined;
  offers: offerTypes;
  variant: MapVariant;
}

function Map({chosenOffer, offers, variant} : MapProps): JSX.Element {
  let mapHeight: string;
  switch (variant) {
    case MapVariant.MainMap:
      mapHeight = MapHeight.MainMap;
      break;
    case MapVariant.RoomMap:
      mapHeight = MapHeight.RoomMap;
      break;
  }

  const mapRef = useRef(null);
  useMap(mapRef, chosenOffer, offers, variant);

  return (
    <div
      style={{height: mapHeight}}
      ref={mapRef}
    />
  );
}

export default Map;
