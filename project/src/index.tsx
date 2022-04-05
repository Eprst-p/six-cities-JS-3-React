import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import 'leaflet/dist/leaflet.css';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchOffersAction, fetchFavoritesAction, checkAuthAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


store.dispatch(fetchOffersAction())
.then(() => store.dispatch(fetchFavoritesAction()))
.then(() => store.dispatch(checkAuthAction()));


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
