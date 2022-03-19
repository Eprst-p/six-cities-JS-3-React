import {store} from '../store/index.js';
import {offerTypes, offerType} from './offer-types';
import {commentType} from './comment-type';

export type State = {
  city: string;
  chosenOfferID: number;
  offers: offerTypes;
  cities: string[];
  comments: commentType[];
  favorites: offerTypes;
  sortOption: string;
  isDataLoaded: boolean;
  offer: offerType | undefined;
  offersNearBy: offerTypes;
};

export type AppDispatch = typeof store.dispatch;
