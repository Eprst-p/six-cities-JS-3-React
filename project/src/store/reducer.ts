import {createReducer} from '@reduxjs/toolkit';
import {changeCity, getOffersForCity, chooseOfferID} from './action';
import {cities} from '../mocks/sources';
import offers from '../fixtures/offers'
import {offerTypes, offerType} from '../types/offer-types';
import {State} from '../types/state'

const initialState: State = {
  city: 'Paris',
  chosenOfferID: 0,
  offersForCity: offers.filter((offer:offerType) => offer.city.name === 'Paris'),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, city) => {
      const newCity = city.payload;
      state.city = newCity;
    })
    .addCase(chooseOfferID, (state, chosenOfferID) => {
      const id = chosenOfferID.payload;
      state.chosenOfferID = id;
    })
    .addCase(getOffersForCity, (state) => {
      state.offersForCity = offers.filter((offer:offerType) => offer.city.name === state.city);
    });
});

export {reducer};
