/* eslint-disable no-console */
import Card from '../card/card';
import SortForm from './sort-form';
import Map from '../map/map';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {chooseOfferID} from '../../store/action';
import {getChosenOffer, getSortedOffers} from '../../store/selectors';
import {Variant} from '../../settings/card-variants';
import {MapVariant} from '../../settings/map-settings';
import {offerTypes} from '../../types/offer-types';
import React from 'react';

type PlacesAndMapProps = {
  offers: offerTypes;
  city: string;
}

function PlacesAndMap({offers, city}: PlacesAndMapProps): JSX.Element {
  const chosenOffer = useAppSelector(getChosenOffer);
  const sortedOffers = useAppSelector(getSortedOffers);
  const dispatch = useAppDispatch();

  const handlerMouseEnterCard = (id: number) => {
    dispatch(chooseOfferID(id));
  };
  const handlerMouseLeaveCard = () => {
    dispatch(chooseOfferID(0));
  };


  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{`${offers.length} places to stay in ${city}`}</b>
          <SortForm />
        <div className="cities__places-list places__list tabs__content">
          {
            sortedOffers.map((location) => (
              <Card
                key={`place-card-${location.id}`}
                variant={Variant.PlaceCard}
                offer={location}
                handlerMouseEnterCard={() => handlerMouseEnterCard(location.id)}
                handlerMouseLeaveCard={() => handlerMouseLeaveCard()}
              />))
          }
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map chosenOffer={chosenOffer} offers={offers} variant={MapVariant.MainMap} />
        </section>
      </div>
    </div>
  );
}

function equalProps(prevProps:PlacesAndMapProps, nextProps:PlacesAndMapProps) {
  return prevProps.offers === nextProps.offers
};

export default React.memo(PlacesAndMap, equalProps);
