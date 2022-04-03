import {offerType} from '../../types/offer-types'

const sortByLowerPrice = (first:offerType, second:offerType) => first.price - second.price;
const sortByHigherPrice = (first:offerType, second:offerType) => second.price - first.price;
const sortByTopRate = (first:offerType, second:offerType) => second.rating - first.rating;

export {sortByLowerPrice, sortByHigherPrice, sortByTopRate};
