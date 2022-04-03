/* eslint-disable no-console */
import Card from '../card/card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerTypes, offerType} from '../../types/offer-types';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {chooseOfferID} from '../../store/interface-process/interface-process';
import {Variant} from '../../settings/card-variants'
import React from 'react';
import {changeFavoritesAction, fetchFavoritesAction} from '../../store/api-actions';

type FavoritesLocationsProps = {
  city: string;
  locationsPerCity: offerTypes;
}

function FavoritesLocations({city, locationsPerCity}: FavoritesLocationsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handlerMouseEnterCard = React.useCallback((id: number) => dispatch(chooseOfferID(id)), []);
  const handlerMouseLeaveCard = React.useCallback(() => dispatch(chooseOfferID(0)), []);
  const handlerBookmarkClick = React.useCallback((offer:offerType) => {
    dispatch(changeFavoritesAction(offer))
    .then(() => dispatch(fetchFavoritesAction()));
  }, []);


  return (
    <>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {
          locationsPerCity.map((location) => (
            <Card
              key={`favorite-card-${location.id}`}
              variant={Variant.FavoriteCard}
              offer={location}
              handlerMouseEnterCard={() => handlerMouseEnterCard(location.id)}
              handlerMouseLeaveCard={() => handlerMouseLeaveCard()}
              handlerBookmarkClick={() => handlerBookmarkClick(location)}
              />))
        }
      </div>
    </>
  );
}

export default FavoritesLocations;
