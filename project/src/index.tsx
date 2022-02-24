/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {generateOffers} from './mocks/offers';
import {generateComments} from './mocks/comments';
import {allCities} from './mocks/sources';
import {getFavorites, getFavoriteCities, getFavoriteLocationsPerCity} from './components/favorites-screen/favorites-get-data'

const allOffers = generateOffers();
console.log(allOffers);

const allComments = generateComments();
console.log(allComments);

const cardCount = allOffers.length;
console.log(cardCount);

const allFavorites = getFavorites(allOffers);
console.log(allFavorites);

const favoriteCities = getFavoriteCities(allFavorites);
console.log(favoriteCities);

const locationsPerCity = getFavoriteLocationsPerCity(allFavorites, favoriteCities);
console.log(locationsPerCity);


const AppPropsValues = {
  CARDS_COUNT: cardCount,
  FAVORITE_CITIES: favoriteCities,
  FAVORITE_LOC_PER_CITY: locationsPerCity,
  ALL_CITIES: allCities,
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
