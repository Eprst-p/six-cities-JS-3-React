import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const AppPropsValues = {
  CARDS_COUNT: 5,
  FAVORITE_CITIES: ['Amsterdam', 'Cologne', 'RandomCity'],
  FAVORITE_LOC_PER_CITY: [2,1,4],
  ALL_CITIES: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
};

ReactDOM.render(
  <React.StrictMode>
    <App
      cardsCount = {AppPropsValues.CARDS_COUNT}
      favoriteCities = {AppPropsValues.FAVORITE_CITIES}
      favoriteLocPerCity = {AppPropsValues.FAVORITE_LOC_PER_CITY}
      allCities = {AppPropsValues.ALL_CITIES}
    />
  </React.StrictMode>,
  document.getElementById('root'));
