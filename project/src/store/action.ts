import {createAction} from '@reduxjs/toolkit';
import {offerTypes} from '../types/offer-types';
import {commentType} from '../types/comment-type';

const changeCity = createAction<string>('main/changeCity');
const chooseOfferID = createAction<number>('cardList/chooseOffer');
const changeSortOption = createAction<string>('main/changeSortOption');
const loadOfffers = createAction<offerTypes>('data/loadOffers');
const loadFavorites = createAction<offerTypes>('data/loadFavorites');
const loadComments = createAction<commentType[]>('data/loadComments');
const refreshComments = createAction<boolean>('data/refreshComments');

export {changeCity, chooseOfferID, changeSortOption, loadOfffers, loadFavorites, loadComments, refreshComments};
