import {store} from '../store/index.js';
import {offerTypes, offerType} from './offer-types';
import {CommentType} from './comment-type';
import {AuthorizationStatus} from '../settings/auth-status';
import {Email} from "./email";


export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail: Email;
};

export type DataProcess = {
  offers: offerTypes;
  offer?: offerType;
  comments: CommentType[];
  favorites: offerTypes;
  offersNearBy: offerTypes;
  isDataLoaded: boolean;
};

export type InterfaceProcess = {
  isFormDisabled: boolean;
  chosenOfferID: number;
  cities: string[];
  sortOption: string;
  city: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
