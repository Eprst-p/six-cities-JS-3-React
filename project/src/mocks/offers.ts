import {offerType} from '../types/offer-types';
import {getRandomPositiveNumber, getRandomFloatNumber, getRandomElement, getRandomCoordinate} from './randomaizers';
import {apartmentPhotos, insideItems, cities, titles, roomTypes, descriptions, coordinates} from './sources';

const generateGoods = ():string[] => {
  const randomIndex = getRandomPositiveNumber(0, 9);
  return insideItems.slice(0, randomIndex);
};

const generateImges = ():string[] => {
  const randomIndex = getRandomPositiveNumber(0, 5);
  return apartmentPhotos.slice(0, randomIndex);
};

const generateOffer = ():offerType => {
    const locationCoordinates:number[] = getRandomCoordinate(coordinates);
    return (
    {
      bedrooms: getRandomPositiveNumber(1, 5),
      city: {
        location: {
        latitude: locationCoordinates[0],
        longitude: locationCoordinates[1],
        zoom: getRandomPositiveNumber(5, 10)
        },
        name: getRandomElement(cities),
      },
      description: getRandomElement(descriptions),
      goods: generateGoods(),
      host: {
        avatarUrl: 'img/avatar-angelina.jpg',
        id: getRandomPositiveNumber(1,10000000),
        isPro: Boolean(getRandomPositiveNumber(0, 1)),
        name: `clon-Angelina-${getRandomPositiveNumber(1,45694152)}`
      },
      id: getRandomPositiveNumber(1,10000000),
      images: generateImges(),
      isFavorite: Boolean(getRandomPositiveNumber(0, 1)),
      isPremium: Boolean(getRandomPositiveNumber(0, 1)),
      location: {
        latitude: getRandomFloatNumber(1, 50),
        longitude: getRandomFloatNumber(1, 50),
        zoom: getRandomPositiveNumber(5,10)
      },
      maxAdults: getRandomPositiveNumber(1,10),
      previewImage: getRandomElement(apartmentPhotos),
      price: getRandomPositiveNumber(1,15)*10,
      rating: getRandomPositiveNumber(10,50)/10,
      title: getRandomElement(titles),
      type: getRandomElement(roomTypes)
    });
  };

const generateOffers = () => {
  const offersAmount = getRandomPositiveNumber(35, 120);
  const offers = [];
  for (let i = 0; i< offersAmount; i++) {
    offers.push(generateOffer());
  }
  return offers;
};

export {generateOffers}
