/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import 'leaflet/dist/leaflet.css';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchOffersAction} from './store/api-actions';

store.dispatch(fetchOffersAction());
console.log(store.getState());

//store.dispatch(checkAuthAction());
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
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
