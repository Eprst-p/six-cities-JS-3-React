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

const getFavoriteLocationsPerCity = (allFavorites:offerType[], favoriteCities:string[]) => {
  const locationsPerCity :number[] = [];

  favoriteCities.forEach((city) => {
    let locationsAmount = 0;
    allFavorites.forEach((favoriteOffer) => {
      if (favoriteOffer.city.name === city) {
        locationsAmount += 1;
      }
    })
    locationsPerCity.push(locationsAmount);
  });

  return locationsPerCity;
};

export {getFavorites, getFavoriteCities, getFavoriteLocationsPerCity};
