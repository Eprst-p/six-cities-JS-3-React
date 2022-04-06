import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history/browser-history';
import Layout from '../layout/layout';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import LoginScreen from '../login-screen/login-screen';
import PrivateRoute  from '../private-route/private-route';
import NotFound404 from '../not-found-404/not-found-404';
import LoadingScreen from '../loading-screen/loading-screen';
import {useAppSelector} from '../../hooks/redux-hooks';
import {getIsDataLoaded, getAuthStatus} from '../../store/selectors';


function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const authStatus = useAppSelector(getAuthStatus);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
            path={AppRoute.Root}
            element={<Layout />}
        >
          <Route
            path={AppRoute.Main}
            element={<MainScreen/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authStatus}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Property}
            element={<PropertyScreen />}
          />
        </Route>
        <Route
          path="*"
          element={<NotFound404 />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
