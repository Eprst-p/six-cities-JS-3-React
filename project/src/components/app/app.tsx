import {Link, Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Layout from '../layout/layout';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropretyScreen from '../proprety-screen/proprety-screen';
import LoginScreen from '../login-screen/login-sreen';
import PrivateRoute  from '../private-route/private-route';

type AppScreenProps = {
  cardsCount: number;
  favoriteCities: string[];
  favoriteLocPerCity: number[];
  allCities: string[];
}

function App({cardsCount, favoriteCities, favoriteLocPerCity, allCities}: AppScreenProps): JSX.Element {

  return (
      <BrowserRouter>
      <Routes>
        <Route
            path={AppRoute.Root}
            element={<Layout />}
        >
          <Route
            path={AppRoute.Main}
            element={<MainScreen cardsCount={cardsCount} allCities={allCities}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth} //чтобы попасть на favorites надо заменить на .Auth
              >
                <FavoritesScreen favoriteCities={favoriteCities} favoriteLocPerCity={favoriteLocPerCity}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Proprety}
            element={<PropretyScreen />}
          />
        </Route>
        <Route path="*" element={
          <>
            <h1>
              404.
              <br />
              <small>Page not found</small>
            </h1>
            <Link to={AppRoute.Main}>Go to main page</Link>
          </>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
