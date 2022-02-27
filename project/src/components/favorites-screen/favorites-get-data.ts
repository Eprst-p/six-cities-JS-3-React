import {offerType} from '../../types/offer-type';

const getFavorites = (allOffers:offerType[]):offerType[] => {
  const favorites :offerType[] = [];
  allOffers.forEach((offer) => {
    if (offer.isFavorite === true) {
      favorites.push(offer);
    }
  });
  return favorites;
};

const getFavoriteCities = (allFavorites:offerType[]) => {
  const favoriteCities :string[] = [];
  allFavorites.forEach((offer) => {
    if (!favoriteCities.includes(offer.city.name)) {
      favoriteCities.push(offer.city.name);
    }
  });
  return favoriteCities;
};

const getLocationsPerCity = (allFavorites:offerType[], city:string) => {
  const locationsPerCity :offerType[] = [];
  allFavorites.forEach((favoriteOffer) => {
    if (favoriteOffer.city.name === city) {
      locationsPerCity.push(favoriteOffer);
    }
  });
  return locationsPerCity;
};

export {getFavorites, getFavoriteCities, getLocationsPerCity};
