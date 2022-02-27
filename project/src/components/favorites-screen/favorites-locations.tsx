import FavoriteCard from './favorite-card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerType} from '../../types/offer-type';

type FavoritesLocationsProps = {
  city: string;
  locationsPerCity: offerType[];
}

function FavoritesLocations({city, locationsPerCity}: FavoritesLocationsProps): JSX.Element {
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
          locationsPerCity.map((location) => (<FavoriteCard key={`favorite-card-${location.id}`} offer={location} />))
        }
      </div>
    </>
  );
}

export default FavoritesLocations;
