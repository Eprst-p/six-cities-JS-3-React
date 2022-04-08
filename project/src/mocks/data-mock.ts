import { name, datatype, internet, image, date } from "faker";

export const makeFakeOffer = () => ({
  bedrooms: datatype.number,
  city: {
    location: {
    latitude: datatype.number,
    longitude: datatype.number,
    zoom: datatype.number,
  },
  name: name.title,
  },
  description: name.title,
  goods: new Array(5).fill(null). map(() => name.title),
  host: {
    avatarUrl: internet.url,
    id: datatype.number,
    isPro: datatype.boolean,
    name: name.firstName,
  },
  id: datatype.number,
  images: new Array(6).fill(null). map(() => image.imageUrl),
  isFavorite: datatype.boolean,
  isPremium: datatype.boolean,
  location: {
    latitude: datatype.number,
    longitude: datatype.number,
    zoom: datatype.number,
  },
  maxAdults: datatype.number,
  previewImage: image.imageUrl,
  price: datatype.number,
  rating: datatype.number,
  title: name.title,
  type: name.title,
});

export const makeFakeOffers = new Array(100).fill(null).map(() =>  makeFakeOffer());

export const makeFakeFavorite = () => {
  const simpleOffer = makeFakeOffer();
  return ({...simpleOffer, isFavorite: true})
}

export const makeFakeFavorites = new Array(10).fill(null).map(() =>  makeFakeFavorite());

export const makeFakeOffersNearby = new Array(3).fill(null).map(() =>  makeFakeOffer());

export const makeFakeComment = () => ({
  comment: datatype.string(50),
  date: date.past.toString(),
  id: datatype.number,
  rating: datatype.number,
  user: {
    avatarUrl: internet.url,
    id: datatype.number,
    isPro: datatype.boolean,
    name: name.title,
  }
});

export const makeFakeComments = new Array(15).fill(null).map(() =>  makeFakeComment());

