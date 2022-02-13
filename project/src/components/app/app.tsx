import MainScreen from '../main-screen/main-screen';
//import FavoritesScreen from '../favorites-screen/favorites-screen';

type AppScreenProps = {
  cardsCount: number;
  favoriteCities: string[];
  favoriteLocPerCity: number[];
}

function App({cardsCount, favoriteCities, favoriteLocPerCity}: AppScreenProps): JSX.Element {
  return (
    <MainScreen cardsCount={cardsCount}/>
    //<FavoritesScreen favoriteCities={favoriteCities} favoriteLocPerCity={favoriteLocPerCity}/> - тест для favorites
  );
}

export default App;
