import {createAction} from '@reduxjs/toolkit';

const changeCity = createAction<string>('main/changeCity');
const chooseOfferID = createAction<number>('main/chooseOffer');

export {changeCity, chooseOfferID};
