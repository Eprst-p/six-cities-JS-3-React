import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {InterfaceProcess} from '../../types/state';
import {cities} from '../../settings/cities';
import {SortOption} from '../../settings/sort-options';


const initialState: InterfaceProcess = {
  isFormDisabled: false,
  chosenOfferID: 0,
  cities: cities,
  sortOption: SortOption.Popular,
  city: 'Paris',
};

export const interfaceProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    formSubmit: (state, {payload}) => {state.isFormDisabled = payload},
    chooseOfferID: (state, {payload}) => {state.chosenOfferID = payload},
    changeSortOption: (state, {payload}) => {state.sortOption = payload},
    changeCity: (state, {payload}) => {state.city = payload},
  },
});

export const {formSubmit, chooseOfferID, changeSortOption, changeCity} = interfaceProcess.actions;
