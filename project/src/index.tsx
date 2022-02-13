import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Settings = {
  CARDS_COUNT: 5,
  FAVORITE_CITIES: ['Amsterdam', 'Cologne', 'RandomCity'],
  FAVORITE_LOC_PER_CITY: [2,1,4],
};

ReactDOM.render(
  <React.StrictMode>
    <App
      cardsCount = {Settings.CARDS_COUNT}
      favoriteCities = {Settings.FAVORITE_CITIES}
      favoriteLocPerCity = {Settings.FAVORITE_LOC_PER_CITY}
    />
  </React.StrictMode>,
  document.getElementById('root'));
