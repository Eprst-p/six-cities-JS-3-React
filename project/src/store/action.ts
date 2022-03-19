import {createAction} from '@reduxjs/toolkit';
import {offerTypes, offerType} from '../types/offer-types';
import {commentType} from '../types/comment-type';
import {AuthorizationStatus} from '../settings/auth-status';
import {Email} from '../types/email';

export const changeCity = createAction<string>('main/changeCity');
export const chooseOfferID = createAction<number>('cardList/chooseOffer');
export const changeSortOption = createAction<string>('main/changeSortOption');
export const loadOfffers = createAction<offerTypes>('data/loadOffers');
export const loadOffer = createAction<offerType>('data/loadOffer');
export const loadOffersNearBy = createAction<offerTypes>('data/loadOffersNearBy');
export const loadFavorites = createAction<offerTypes>('data/loadFavorites');
export const loadComments = createAction<commentType[]>('data/loadComments');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const saveUserEmail = createAction<Email>('user/saveUserEmail');
