import {State} from '../types/state'
import {SortOption} from '../settings/sort-options';
import {sortByLowerPrice, sortByHigherPrice, sortByTopRate} from '../components/main-screen/sort-variants';
import {createSelector} from 'reselect';


export const getSortedOffers = (state:State) => {
  switch (state.INTERFACE.sortOption) {
    case SortOption.PriceHigh:
      return getOffersForCity(state).sort(sortByHigherPrice);
    case SortOption.PriceLow:
      return getOffersForCity(state).sort(sortByLowerPrice);
    case SortOption.TopRated:
      return getOffersForCity(state).sort(sortByTopRate);
    default:
      return getOffersForCity(state);
  }
};

export const getOffer = (state:State) => state.DATA.offer;
export const getOffers = (state:State) => state.DATA.offers;
export const getOffersNearBy = (state:State) => state.DATA.offersNearBy;
export const getComments = (state:State) => state.DATA.comments;
export const getFavorites = (state:State) => state.DATA.favorites;
export const getFavoriteCities = createSelector(getFavorites, (favorites) => {
  const favoriteCities:string[] = [];
  favorites.forEach((offer) => {
    if (!favoriteCities.includes(offer.city.name)) {
      favoriteCities.push(offer.city.name);
    }
  });
  return favoriteCities;
});
export const getIsDataLoaded = (state:State) => state.DATA.isDataLoaded;

export const getCities = (state:State) => state.INTERFACE.cities;
export const getCity = (state:State) => state.INTERFACE.city;
export const getSortOption = (state:State) => state.INTERFACE.sortOption;
export const getIsFormDisabled = (state:State) => state.INTERFACE.isFormDisabled;
export const getChosenOfferID = (state:State) => state.INTERFACE.chosenOfferID;
export const getOffersForCity = createSelector(getOffers, getCity, (offers, city) => offers.filter((offer) => offer.city.name === city));
export const getChosenOffer = createSelector(getOffersForCity, getChosenOfferID, (offers, chosenId) => offers.find((offer) => offer.id === chosenId));

export const getAuthStatus = (state:State) => state.USER.authorizationStatus;
export const getUserEmail = (state:State) => state.USER.userEmail;
