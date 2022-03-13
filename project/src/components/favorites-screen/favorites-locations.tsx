/* eslint-disable no-console */
import FavoriteCard from './favorite-card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerTypes} from '../../types/offer-types';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {chooseOfferID} from '../../store/action';

type FavoritesLocationsProps = {
  city: string;
  locationsPerCity: offerTypes;
}

function FavoritesLocations({city, locationsPerCity}: FavoritesLocationsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handlerMouseEnterCard = (id: number) => {
    dispatch(chooseOfferID(id));
  };
  const handlerMouseLeaveCard = () => {
    dispatch(chooseOfferID(0));
  };

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
            <FavoriteCard
              key={`favorite-card-${location.id}`}
              offer={location}
              handlerMouseEnterCard={() => handlerMouseEnterCard(location.id)}
              handlerMouseLeaveCard={() => handlerMouseLeaveCard()}
              />))
        }
      </div>
    </>
  );
}

export default FavoritesLocations;
