import {offerTypes} from '../../types/offer-types';

const getFavorites = (allOffers:offerTypes):offerTypes => allOffers.filter((offer) => offer.isFavorite);

const getFavoriteCities = (allFavorites:offerTypes) => {
  const favoriteCities :string[] = [];
  allFavorites.forEach((offer) => {
    if (!favoriteCities.includes(offer.city.name)) {
      favoriteCities.push(offer.city.name);
    }
  });
  return favoriteCities;
};

const getLocationsPerCity = (allFavorites:offerTypes, city:string) => allFavorites.filter((favoriteOffer) => favoriteOffer.city.name === city);

export {getFavorites, getFavoriteCities, getLocationsPerCity};
