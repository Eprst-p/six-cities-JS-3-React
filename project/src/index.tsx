import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Settings = {
  CARDS_COUNT: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      cardsCount = {Settings.CARDS_COUNT}
    />
  </React.StrictMode>,
  document.getElementById('root'));
