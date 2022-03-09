/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {cities} from './mocks/sources';
import statickComments from './mocks/statick-comments.json'
import statickFavorites from './mocks/statick-favorites.json'
import offers from './fixtures/offers'
import 'leaflet/dist/leaflet.css';
import {Provider} from 'react-redux';
import {store} from './store';

/*
import {generateAllComments} from './mocks/comments';
import {getFavorites} from './components/favorites-screen/favorites-get-data';

const comments = generateAllComments(offers);
const favorites = getFavorites(offers);
console.log(comments);
console.log(JSON.stringify(comments));
console.log(favorites);
console.log(JSON.stringify(favorites));
*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        cities = {cities}
        offers = {offers}
        comments = {statickComments}
        favorites = {statickFavorites}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
