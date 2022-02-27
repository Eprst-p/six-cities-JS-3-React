import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {generateOffers} from './mocks/offers';
import {generateAllComments} from './mocks/comments';
import {cities} from './mocks/sources';

const offers = generateOffers();
const comments = generateAllComments(offers);

ReactDOM.render(
  <React.StrictMode>
    <App
      cities = {cities}
      offers = {offers}
      comments = {comments}
    />
  </React.StrictMode>,
  document.getElementById('root'));
