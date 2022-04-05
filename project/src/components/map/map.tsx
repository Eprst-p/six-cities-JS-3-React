/* eslint-disable no-console */
import {memo, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {offerType, offerTypes} from '../../types/offer-types';
import {MapHeight, MapVariant} from '../../settings/map-settings';


type MapProps = {
  chosenOffer?: offerType;
  offers: offerTypes;
  variant: MapVariant;
}

function Map({chosenOffer, offers, variant} : MapProps): JSX.Element {
  const mapHeight = {
    [MapVariant.MainMap]: MapHeight.MainMap,
    [MapVariant.RoomMap]: MapHeight.RoomMap,
  };

  const mapRef = useRef(null);
  useMap(mapRef, chosenOffer, offers, variant);

  return (
    <div
      style={{height: mapHeight[variant]}}
      ref={mapRef}
    />
  );
}

function equalProps(prevProps:MapProps, nextProps:MapProps) {
  return prevProps.offers === nextProps.offers && prevProps.chosenOffer === nextProps.chosenOffer
};

export default memo(Map, equalProps);
