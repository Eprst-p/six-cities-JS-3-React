import {createReducer} from '@reduxjs/toolkit';
import {changeCity, chooseOfferID, changeSortOption, loadOfffers, loadFavorites, loadComments, loadOffer, loadOffersNearBy, setAuthorizationStatus, saveUserEmail, formSubmit} from './action';
import {cities} from '../mocks/sources';
import {State} from '../types/state'
import {SortOption} from '../settings/sort-options';
import {AuthorizationStatus} from '../settings/auth-status';


const initialState: State = {
  city: 'Paris',
  chosenOfferID: 0,
  offers: [],
  cities: cities,
  comments: [],
  favorites: [],
  sortOption: SortOption.Popular,
  isDataLoaded: false,
  offer: undefined,
  offersNearBy: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  isFormDisabled: false,
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
    .addCase(loadOffer,(state, {payload}) => {state.offer = payload})
    .addCase(loadOffersNearBy,(state, {payload}) => {state.offersNearBy = payload})
    .addCase(loadFavorites,(state, {payload}) => {state.favorites = payload})
    .addCase(loadComments,(state, {payload}) => {state.comments = payload})
    .addCase(setAuthorizationStatus,(state, {payload}) => {state.authorizationStatus = payload})
    .addCase(saveUserEmail,(state, {payload}) => {state.userEmail = payload})
    .addCase(formSubmit,(state, {payload}) => {state.isFormDisabled = payload})
});

export {reducer};
