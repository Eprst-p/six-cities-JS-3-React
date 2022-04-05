import Card from '../card/card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerTypes} from '../../types/offer-types';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {chooseOfferID} from '../../store/interface-process/interface-process';
import {Variant} from '../../settings/card-variants'
import {useCallback} from 'react';

type FavoritesLocationsProps = {
  city: string;
  locationsPerCity: offerTypes;
}

function FavoritesLocations({city, locationsPerCity}: FavoritesLocationsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handlerMouseOverCard = useCallback((id=0) => dispatch(chooseOfferID(id)), [dispatch]);

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
              handlerMouseOverCard={handlerMouseOverCard}
            />))
        }
      </div>
    </>
  );
}

export default FavoritesLocations;
