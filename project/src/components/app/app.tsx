import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';

type AppScreenProps = {
  cardsCount: number;
  favoriteCities: string[];
  favoriteLocPerCity: number[];
}

function App({cardsCount, favoriteCities, favoriteLocPerCity}: AppScreenProps): JSX.Element {
  return (
    <>
      <MainScreen cardsCount={cardsCount}/>
      <FavoritesScreen favoriteCities={favoriteCities} favoriteLocPerCity={favoriteLocPerCity}/>{/*вывод фаворитес в общей куче для теста - т.е сейчас двойная отрисовка*/}
    </>
  );
}

export default App;
