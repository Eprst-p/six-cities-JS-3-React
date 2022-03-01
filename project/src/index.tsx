/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {cities} from './mocks/sources';
import statickOffers from './mocks/statick-offers.json'
import statickComments from './mocks/statick-comments.json'
import statickFavorites from './mocks/statick-favorites.json'

/*
import {generateOffers} from './mocks/offers';
import {generateAllComments} from './mocks/comments';
import {getFavorites} from './components/favorites-screen/favorites-get-data';

const offers = generateOffers();
const comments = generateAllComments(offers);
const favorites = getFavorites(offers);
console.log(offers);
console.log(JSON.stringify(offers));
console.log(comments);
console.log(JSON.stringify(comments));
console.log(favorites);
console.log(JSON.stringify(favorites));
*/

ReactDOM.render(
  <React.StrictMode>
    <App
      cities = {cities}
      offers = {statickOffers}
      comments = {statickComments}
      favorites = {statickFavorites}
    />
  </React.StrictMode>,
  document.getElementById('root'));
