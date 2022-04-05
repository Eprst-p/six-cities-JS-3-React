import FavoritesLocations from './favorites-locations';
import {getFavoriteCities} from '../../store/selectors';
import {offerTypes} from '../../types/offer-types';
import {memo, useCallback} from 'react';
import {useAppSelector} from '../../hooks/redux-hooks';

type FavoritesListProps = {
  favorites: offerTypes;
}

function FavoritesList({favorites}: FavoritesListProps): JSX.Element {
  const favoriteCities = useAppSelector(getFavoriteCities);
  const getLocationsPerCity = useCallback((allFavorites:offerTypes, city:string) => allFavorites.filter((favoriteOffer) => favoriteOffer.city.name === city), []);

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

export default memo(FavoritesList);
