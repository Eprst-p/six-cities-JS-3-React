import FavoriteCard from './favorite-card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';

type FavoritesLocationsProps = {
  city: string;
  favoritesCount: number;
}

function FavoritesLocations({city, favoritesCount}: FavoritesLocationsProps): JSX.Element {

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
          // eslint-disable-next-line react/no-array-index-key
          new Array(favoritesCount).fill('').map((_, index) => (<FavoriteCard key={`favorite-card-${index}`} />))
        }
      </div>
    </>
  );
}

export default FavoritesLocations;
