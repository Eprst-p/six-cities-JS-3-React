//import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state'
import {SortOption} from '../settings/sort-options';
import {sortByLowerPrice, sortByHigherPrice, sortByTopRate} from '../components/main-screen/sort-variants';

const getOffersForCity = (state:State) => state.offers.filter((offer) => offer.city.name === state.city);
const getChosenOffer = (state:State) => getOffersForCity(state).find((offer) => offer.id === state.chosenOfferID);

const getSortedOffers = (state:State) => {
  switch (state.sortOption) {
    case SortOption.PriceHigh:
      return getOffersForCity(state).sort(sortByHigherPrice);
    case SortOption.PriceLow:
      return getOffersForCity(state).sort(sortByLowerPrice);
    case SortOption.TopRated:
      return getOffersForCity(state).sort(sortByTopRate);
    case SortOption.Popular:
      return getOffersForCity(state);
  }
  return getOffersForCity(state);
};

export {getOffersForCity, getChosenOffer, getSortedOffers};
