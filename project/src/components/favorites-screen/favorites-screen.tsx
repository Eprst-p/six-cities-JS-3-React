import FavoritesList from './favorites-list';
import FavoritesEmpty from './favorites-empty';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {useEffect} from 'react';
import {fetchFavoritesAction} from '../../store/api-actions';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, []);
  const favorites = useAppSelector(({DATA}) => DATA.favorites);

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
        {
          favorites.length === 0
          ?
          <FavoritesEmpty />
          :
          <FavoritesList favorites={favorites}/>
        }
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
