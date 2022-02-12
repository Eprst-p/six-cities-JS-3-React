import FavoriteCard from './favorite-card';

type FavoritesLocationsProps = {
  city: string;
  favoritesCount: number;
}

function FavoritesLocations({city}: FavoritesLocationsProps, {favoritesCount}: FavoritesLocationsProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <FavoriteCard />
        тестовый вывод - {favoritesCount}
      </div>
    </li>
  );
}

export default FavoritesLocations;
