import {createReducer} from '@reduxjs/toolkit';
import {changeCity, chooseOfferID, changeSortOption, loadOfffers} from './action';
import {cities} from '../mocks/sources';
import {State} from '../types/state'
import statickComments from '../mocks/statick-comments.json'
import statickFavorites from '../mocks/statick-favorites.json'
import {SortOption} from '../settings/sort-options';


const initialState: State = {
  city: 'Paris',
  chosenOfferID: 0,
  offers: [],
  cities: cities,
  comments: statickComments,
  favorites: statickFavorites,
  sortOption: SortOption.Popular,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, {payload}) => {state.city = payload})
    .addCase(chooseOfferID, (state, {payload}) => {state.chosenOfferID = payload})
    .addCase(changeSortOption, (state, {payload}) => {state.sortOption = payload})
    .addCase(loadOfffers, (state, {payload}) => {
      state.offers = payload;
      state.isDataLoaded = true;
    })
});

export {reducer};
