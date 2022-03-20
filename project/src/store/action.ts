import {createAction} from '@reduxjs/toolkit';
import {offerTypes, offerType} from '../types/offer-types';
import {CommentType, NewCommentType} from '../types/comment-type';
import {AuthorizationStatus} from '../settings/auth-status';
import {Email} from '../types/email';

export const changeCity = createAction<string>('main/changeCity');
export const chooseOfferID = createAction<number>('cardList/chooseOffer');
export const changeSortOption = createAction<string>('main/changeSortOption');
export const loadOfffers = createAction<offerTypes>('data/loadOffers');
export const loadOffer = createAction<offerType>('data/loadOffer');
export const loadOffersNearBy = createAction<offerTypes>('data/loadOffersNearBy');
export const loadFavorites = createAction<offerTypes>('data/loadFavorites');
export const loadComments = createAction<CommentType[]>('data/loadComments');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const saveUserEmail = createAction<Email>('user/saveUserEmail');
export const userCommentPush = createAction<NewCommentType>('user/commentPush');
