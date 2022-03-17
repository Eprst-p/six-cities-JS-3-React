import {createReducer} from '@reduxjs/toolkit';
import {changeCity, chooseOfferID, changeSortOption, loadOfffers, loadFavorites, loadComments, refreshComments} from './action';
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
  comments: [],
  favorites: [],
  sortOption: SortOption.Popular,
  isDataLoaded: false,
  isCommentsLoaded: false,
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
    .addCase(loadFavorites,(state, {payload}) => {state.favorites = payload})
    .addCase(loadComments,(state, {payload}) => {
      state.comments = payload;
      state.isCommentsLoaded = true;
    })
    .addCase(refreshComments, (state, {payload}) => {state.isCommentsLoaded = !payload})
});

export {reducer};
