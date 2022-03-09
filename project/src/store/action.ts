import {createAction} from '@reduxjs/toolkit';
import {offerTypes, offerType} from '../types/offer-types';


const changeCity = createAction<string>('main/changeCity');
const getOffersForCity = createAction('main/getOffersForCity');
const chooseOfferID = createAction<number>('main/chooseOffer');

export {changeCity, getOffersForCity, chooseOfferID};
