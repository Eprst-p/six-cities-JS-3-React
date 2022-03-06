/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {cities} from './mocks/sources';
import statickComments from './mocks/statick-comments.json'
import statickFavorites from './mocks/statick-favorites.json'
import offers from './fixtures/offers'
import 'leaflet/dist/leaflet.css';

ReactDOM.render(
  <React.StrictMode>
    <App
      cities = {cities}
      offers = {offers}
      comments = {statickComments}
      favorites = {statickFavorites}
    />
  </React.StrictMode>,
  document.getElementById('root'));
