import {createAction} from '@reduxjs/toolkit';

const changeCity = createAction<string>('main/changeCity');
const chooseOfferID = createAction<number>('main/chooseOffer');
const changeSortOption = createAction<string>('main/changeSortOption');

export {changeCity, chooseOfferID, changeSortOption};
