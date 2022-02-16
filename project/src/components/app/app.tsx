import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Layout from '../layout/layout';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropretyScreen from '../proprety-screen/proprety-screen';
import LoginScreen from '../login-screen/login-sreen';


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
            element={<FavoritesScreen favoriteCities={favoriteCities} favoriteLocPerCity={favoriteLocPerCity}/>}
          />
          <Route
            path={AppRoute.Proprety}
            element={<PropretyScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
