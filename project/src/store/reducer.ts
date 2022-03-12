import {createReducer} from '@reduxjs/toolkit';
import {changeCity, chooseOfferID, changeSortOption} from './action';
import {cities} from '../mocks/sources';
import offers from '../fixtures/offers'
import {State} from '../types/state'
import statickComments from '../mocks/statick-comments.json'
import statickFavorites from '../mocks/statick-favorites.json'
import {SortOptions} from '../settings/sort-options';


const initialState: State = {
  city: 'Paris',
  chosenOfferID: 0,
  offers: offers,
  cities: cities,
  comments: statickComments,
  favorites: statickFavorites,
  sortOption: SortOptions.Popular,
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
    .addCase(changeSortOption, (state, activeSortOption) => {
      const sortOption = activeSortOption.payload;
      state.sortOption = sortOption;
    })
});

export {reducer};
