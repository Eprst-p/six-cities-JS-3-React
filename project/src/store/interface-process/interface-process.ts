import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {InterfaceProcess} from '../../types/state';
import {cities} from '../../mocks/sources';
import {SortOption} from '../../settings/sort-options';


const initialState: InterfaceProcess = {
  isFormDisabled: false,
  chosenOfferID: 0,
  cities: cities,
  sortOption: SortOption.Popular,
};

export const interfaceProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    formSubmit: (state, {payload}) => {state.isFormDisabled = payload},
    chooseOfferID: (state, {payload}) => {state.chosenOfferID = payload},
    changeSortOption: (state, {payload}) => {state.sortOption = payload},
  },
});

export const {formSubmit, chooseOfferID, changeSortOption} = interfaceProcess.actions;
