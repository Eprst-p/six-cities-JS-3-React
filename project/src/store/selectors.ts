//import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state'
import {SortOptions} from '../settings/sort-options';
import {sortByLowerPrice, sortByHigherPrice, sortByTopRate} from '../components/main-screen/sort-variants';

const getOffersForCity = (state:State) => state.offers.filter((offer) => offer.city.name === state.city);
const getChosenOffer = (state:State) => getOffersForCity(state).find((offer) => offer.id === state.chosenOfferID);

const getSortedOffers = (state:State) => {
  switch (state.sortOption) {
    case SortOptions.PriceHigh:
      return getOffersForCity(state).sort(sortByHigherPrice);
    case SortOptions.PriceLow:
      return getOffersForCity(state).sort(sortByLowerPrice);
    case SortOptions.TopRated:
      return getOffersForCity(state).sort(sortByTopRate);
    case SortOptions.Popular:
      return getOffersForCity(state);
  }
  return getOffersForCity(state);
};

export {getOffersForCity, getChosenOffer, getSortedOffers};
