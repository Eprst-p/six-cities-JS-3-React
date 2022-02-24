import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {AuthorizationStatus} from '../../settings/auth-status'
import Layout from '../layout/layout';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropretyScreen from '../proprety-screen/proprety-screen';
import LoginScreen from '../login-screen/login-sreen';
import PrivateRoute  from '../private-route/private-route';
import NotFound404 from '../not-found-404/not-found-404';
import {offerType} from '../../types/offer-type';

type AppScreenProps = {
  allCities: string[];
  allOffers: offerType[];
}

function App({allCities, allOffers}: AppScreenProps): JSX.Element {

  return (
      <BrowserRouter>
      <Routes>
        <Route
            path={AppRoute.Root}
            element={<Layout />}
        >
          <Route
            path={AppRoute.Main}
            element={<MainScreen allOffers={allOffers} allCities={allCities}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth} //чтобы попасть на favorites надо заменить на .Auth
              >
                <FavoritesScreen allOffers={allOffers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Proprety}
            element={<PropretyScreen />}
          />
        </Route>
        <Route path="*" element={<NotFound404 />
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
