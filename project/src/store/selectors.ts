import {DataProcess, InterfaceProcess} from '../types/state'
import {SortOption} from '../settings/sort-options';
import {sortByLowerPrice, sortByHigherPrice, sortByTopRate} from '../components/main-screen/sort-variants';

const getOffersForCity = (data:DataProcess) => data.offers.filter((offer) => offer.city.name === data.city);
const getChosenOffer = (data:DataProcess, chosen:InterfaceProcess) => getOffersForCity(data).find((offer) => offer.id === chosen.chosenOfferID);

const getSortedOffers = (data:DataProcess, chosen:InterfaceProcess) => {
  switch (chosen.sortOption) {
    case SortOption.PriceHigh:
      return getOffersForCity(data).sort(sortByHigherPrice);
    case SortOption.PriceLow:
      return getOffersForCity(data).sort(sortByLowerPrice);
    case SortOption.TopRated:
      return getOffersForCity(data).sort(sortByTopRate);
    default:
      return getOffersForCity(data);
  }
};

export {getOffersForCity, getChosenOffer, getSortedOffers};
