import FavoriteCard from './favorite-card';

type FavoritesLocationsProps = {
  city: string;
  favoritesCount: number;
}

function FavoritesLocations({city, favoritesCount}: FavoritesLocationsProps): JSX.Element {

  return (
    <>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
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
