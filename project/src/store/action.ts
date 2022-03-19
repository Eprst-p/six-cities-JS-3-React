import {createAction} from '@reduxjs/toolkit';
import {offerTypes, offerType} from '../types/offer-types';
import {commentType} from '../types/comment-type';

const changeCity = createAction<string>('main/changeCity');
const chooseOfferID = createAction<number>('cardList/chooseOffer');
const changeSortOption = createAction<string>('main/changeSortOption');
const loadOfffers = createAction<offerTypes>('data/loadOffers');
const loadOffer = createAction<offerType>('data/loadOffer');
const loadOffersNearBy = createAction<offerTypes>('data/loadOffersNearBy');
const loadFavorites = createAction<offerTypes>('data/loadFavorites');
const loadComments = createAction<commentType[]>('data/loadComments');

export {changeCity, chooseOfferID, changeSortOption, loadOfffers, loadFavorites, loadComments, loadOffer, loadOffersNearBy};
