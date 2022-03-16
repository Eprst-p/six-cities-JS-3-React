import {createAction} from '@reduxjs/toolkit';
import {offerTypes} from '../types/offer-types';

const changeCity = createAction<string>('main/changeCity');
const chooseOfferID = createAction<number>('cardList/chooseOffer');
const changeSortOption = createAction<string>('main/changeSortOption');
const loadOfffers = createAction<offerTypes>('data/loadOffers');

export {changeCity, chooseOfferID, changeSortOption, loadOfffers};
