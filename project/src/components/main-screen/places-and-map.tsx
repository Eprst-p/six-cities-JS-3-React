/* eslint-disable no-console */
import Card from '../card/card';
import SortForm from './sort-form';
import Map from '../map/map';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {chooseOfferID} from '../../store/interface-process/interface-process';
import {getChosenOffer, getSortedOffers} from '../../store/selectors';
import {Variant} from '../../settings/card-variants';
import {MapVariant} from '../../settings/map-settings';
import {offerTypes} from '../../types/offer-types';
import {memo, useCallback } from 'react';


type PlacesAndMapProps = {
  offers: offerTypes;
  city: string;
}

function PlacesAndMap({offers, city}: PlacesAndMapProps): JSX.Element {
  const chosenOffer = useAppSelector(getChosenOffer);
  const sortedOffers = useAppSelector(getSortedOffers);
  const dispatch = useAppDispatch();

  const handlerMouseOverCard = useCallback((id=0) => dispatch(chooseOfferID(id)), [dispatch]);

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
                handlerMouseOverCard={handlerMouseOverCard}
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

export default memo(PlacesAndMap);
