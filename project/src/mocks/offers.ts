import {offer} from "../types/offer";
import {getRandomPositiveNumber, getRandomFloatNumber, getRandomElement} from './randomaizers';
import {apartmentPhotos, insideItems, allCities, titles, roomTypes, descriptions} from './sources';

const generateGoods = ():string => {
  const randomIndex = getRandomPositiveNumber(0, 9);
  return insideItems.slice(0, randomIndex).join();
};

const generateImges = ():string => {
  const randomIndex = getRandomPositiveNumber(0, 5);
  return apartmentPhotos.slice(0, randomIndex).join();
};

const generateOffer = ():offer => (
    {
      bedrooms: getRandomPositiveNumber(1, 5),
      city: {
        location: {
        latitude: getRandomFloatNumber(1, 50),
        longitude: getRandomFloatNumber(1, 50),
        zoom: getRandomPositiveNumber(5, 10)
        },
        name: getRandomElement(allCities),
      },
      description: getRandomElement(descriptions),
      goods: [
        generateGoods()
      ],
      host: {
        avatarUrl: 'img/avatar-angelina.jpg',
        id: getRandomPositiveNumber(1,10000000),
        isPro: Boolean(getRandomPositiveNumber(0, 1)),
        name: `clon-Angelina-${getRandomPositiveNumber(1,45694152)}`
      },
      id: getRandomPositiveNumber(1,10000000),
      images: [
        generateImges()
      ],
      isFavorite: Boolean(getRandomPositiveNumber(0, 1)),
      isPremium: Boolean(getRandomPositiveNumber(0, 1)),
      location: {
        latitude: getRandomFloatNumber(1, 50),
        longitude: getRandomFloatNumber(1, 50),
        zoom: getRandomPositiveNumber(5,10)
      },
      maxAdults: getRandomPositiveNumber(1,10),
      previewImage: 'img/apartment-01.jpg',
      price: getRandomPositiveNumber(1,15)*10,
      rating: getRandomPositiveNumber(10,50)/10,
      title: getRandomElement(titles),
      type: getRandomElement(roomTypes)
    }
);

const generateOffers = () => {
  const offersAmount = getRandomPositiveNumber(1, 10);
  const offers = [];
  for (let i = 0; i< offersAmount; i++) {
    offers.push(generateOffer());
  }
  return offers;
};

export {generateOffers}
