import {State} from '../types/state'
import {SortOption} from '../settings/sort-options';
import {sortByLowerPrice, sortByHigherPrice, sortByTopRate} from '../components/main-screen/sort-variants';
import {createSelector} from 'reselect';


const getOffersForCity = (state:State) => state.DATA.offers.filter((offer) => offer.city.name === state.INTERFACE.city);
const getChosenOffer = (state:State) => getOffersForCity(state).find((offer) => offer.id === state.INTERFACE.chosenOfferID);

const getSortedOffers = (state:State) => {
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

const getCities = (state:State) => state.INTERFACE.cities;
const getCity = (state:State) => state.INTERFACE.city;
const getCitiesMemo = createSelector(getCities, cities => cities);
const getCityMemo = createSelector(getCity, city => city);
const getOffersForCityMemo = createSelector(getOffersForCity, offers => offers);


export {getOffersForCity, getChosenOffer, getSortedOffers, getCities, getCity, getCitiesMemo, getCityMemo, getOffersForCityMemo};
