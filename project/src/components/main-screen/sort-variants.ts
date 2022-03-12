import {offerType} from '../../types/offer-types'

const sortByLowerPrice = (first:offerType, second:offerType) => {
  const firstPrice = first.price;
  const secondPrice = second.price;
  return firstPrice - secondPrice;
};

const sortByHigherPrice = (first:offerType, second:offerType) => {
  const firstPrice = first.price;
  const secondPrice = second.price;
  return secondPrice - firstPrice;
};

const sortByTopRate = (first:offerType, second:offerType) => {
  const firstRate = first.rating;
  const secondRate = second.rating;
  return secondRate - firstRate;
};

export {sortByLowerPrice, sortByHigherPrice, sortByTopRate};
