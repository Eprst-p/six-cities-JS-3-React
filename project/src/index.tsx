import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {cities} from './mocks/sources';
import statickOffers from './mocks/statick-offers.json'
import statickComments from './mocks/statick-comments.json'
import statickFavorites from './mocks/statick-favorites.json'

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
