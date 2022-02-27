/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {generateOffers} from './mocks/offers';
import {generateAllComments} from './mocks/comments';
import {allCities} from './mocks/sources';

const allOffers = generateOffers();
const allComments = generateAllComments(allOffers);

ReactDOM.render(
  <React.StrictMode>
    <App
      allCities = {allCities}
      allOffers = {allOffers}
      allComments = {allComments}
    />
  </React.StrictMode>,
  document.getElementById('root'));
