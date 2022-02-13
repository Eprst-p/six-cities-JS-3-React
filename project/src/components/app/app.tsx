import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropretyScreen from '../proprety-screen/proprety-screen';

type AppScreenProps = {
  cardsCount: number;
  favoriteCities: string[];
  favoriteLocPerCity: number[];
}

function App({cardsCount, favoriteCities, favoriteLocPerCity}: AppScreenProps): JSX.Element {
  return (
    <>
      <MainScreen cardsCount={cardsCount}/>
      <FavoritesScreen favoriteCities={favoriteCities} favoriteLocPerCity={favoriteLocPerCity}/>{/*вывод в общей куче несколько экранов для теста*/}
      <PropretyScreen />
    </>
  );
}

export default App;
