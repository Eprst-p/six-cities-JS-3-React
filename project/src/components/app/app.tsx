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
import {offerTypes} from '../../types/offer-types';
import {commentType} from '../../types/comment-type';

type AppScreenProps = {
  cities: string[];
  offers: offerTypes;
  comments: commentType[][];
  favorites: offerTypes;
}

function App({cities, offers, comments, favorites}: AppScreenProps): JSX.Element {
  return (
      <BrowserRouter>
      <Routes>
        <Route
            path={AppRoute.Root}
            element={<Layout />}
        >
          <Route
            path={AppRoute.Main}
            element={<MainScreen offers={offers} cities={cities}/>}
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
                <FavoritesScreen favorites={favorites} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Proprety}
            element={<PropretyScreen offers={offers} comments={comments} />}
          />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
