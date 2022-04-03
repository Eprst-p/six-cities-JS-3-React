import FavoritesLocations from './favorites-locations';
import {getFavoriteCities, getLocationsPerCity} from './favorites-get-data'
import {offerTypes} from '../../types/offer-types';

type FavoritesListProps = {
  favorites: offerTypes;
}

function FavoritesList({favorites}: FavoritesListProps): JSX.Element {
  const favoriteCities = getFavoriteCities(favorites);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          favoriteCities.map((city) =>
            (
              <li className="favorites__locations-items" key={city}>
                <FavoritesLocations key={city} city={city} locationsPerCity={getLocationsPerCity(favorites, city)}/>
              </li>)
          )
        }
      </ul>
    </section>
  );
}

export default FavoritesList;
