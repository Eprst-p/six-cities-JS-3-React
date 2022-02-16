import FavoritesLocations from './favorites-locations';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type FavoriteScreenProps = {
  favoriteCities: string[];
  favoriteLocPerCity: number[];
}

function FavoritesScreen({favoriteCities, favoriteLocPerCity}: FavoriteScreenProps): JSX.Element {

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                new Array(favoriteCities.length).fill('').map((_, index) =>
                  (
                    <li className="favorites__locations-items" key={favoriteCities[index]}>
                      <FavoritesLocations key={favoriteCities[index]} city={favoriteCities[index]} favoritesCount ={favoriteLocPerCity[index]}/>
                    </li>)
                )
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main} title={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </>
  );
}

export default FavoritesScreen;
