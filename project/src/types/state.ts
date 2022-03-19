import {store} from '../store/index.js';
import {offerTypes, offerType} from './offer-types';
import {commentType} from './comment-type';
import {AuthorizationStatus} from '../settings/auth-status';
import {Email} from "./email";

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
  authorizationStatus: AuthorizationStatus;
  userEmail: Email;
};

export type AppDispatch = typeof store.dispatch;
