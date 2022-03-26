import FavoritesLocations from './favorites-locations';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {getFavoriteCities, getLocationsPerCity} from './favorites-get-data'
import {useAppSelector} from '../../hooks/redux-hooks';

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector(({DATA}) => DATA.favorites);

  const favoriteCities = getFavoriteCities(favorites);
  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                favoriteCities.map((city) =>
                  (
                    <li className="favorites__locations-items" key={city}>
                      <FavoritesLocations key={city} city={city} locationsPerCity ={getLocationsPerCity(favorites, city)}/>
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
