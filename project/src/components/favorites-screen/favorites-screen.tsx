import FavoritesLocations from './favorites-locations';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerType} from '../../types/offer-type';
import {getFavorites, getFavoriteCities, getFavoriteLocationsPerCity} from './favorites-get-data'

type FavoriteScreenProps = {
  allOffers: offerType[];
}

function FavoritesScreen({allOffers}: FavoriteScreenProps): JSX.Element {
  const allFavorites = getFavorites(allOffers);
  const favoriteCities = getFavoriteCities(allFavorites);
  const locationsPerCity = getFavoriteLocationsPerCity(allFavorites, favoriteCities);

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                favoriteCities.map((city, index) =>
                  (
                    <li className="favorites__locations-items" key={city}>
                      <FavoritesLocations key={city} city={city} favoritesCount ={locationsPerCity[index]}/>
                    </li>)
                )
              }
            </ul>
          </section>s
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
