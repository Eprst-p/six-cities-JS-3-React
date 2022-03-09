import {store} from '../store/index.js';
import {offerType, offerTypes, } from './offer-types';

export type State = {
  city: string;
  chosenOfferID: number;
  offersForCity: offerTypes;
};

export type AppDispatch = typeof store.dispatch;
