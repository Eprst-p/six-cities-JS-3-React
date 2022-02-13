import FavoriteCard from './favorite-card';

type FavoritesLocationsProps = {
  city: string;
  favoritesCount: number;
}

function FavoritesLocations({city, favoritesCount}: FavoritesLocationsProps): JSX.Element {
  const emptyCards = Array.from({length: favoritesCount});//массив только для map
  const temporaryKeys = emptyCards.map((value, index) => index.toString());//пока такие кривые ключи, т.к нет данных и нет ничего уникального, нет id. Позже заменить на айди или подобное


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
        {
          emptyCards.map((value, index) =>
            <FavoriteCard key={temporaryKeys[index]}/>,
          )
        }
      </div>
    </li>
  );
}

export default FavoritesLocations;
