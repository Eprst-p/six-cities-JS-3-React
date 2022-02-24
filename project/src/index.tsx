/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {generateOffers} from './mocks/offers';
import {generateComments} from './mocks/comments';
import {allCities} from './mocks/sources';

const allOffers = generateOffers();
console.log(allOffers);

const allComments = generateComments();
console.log(allComments);

ReactDOM.render(
  <React.StrictMode>
    <App
      allCities = {allCities}
      allOffers = {allOffers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
