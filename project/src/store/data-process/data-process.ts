import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {DataProcess} from '../../types/state';


const initialState: DataProcess = {
  offers: [],
  offer: undefined,
  comments: [],
  favorites: [],
  offersNearBy: [],
  isDataLoaded: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOfffers: (state, {payload}) => {
      state.offers = payload;
      state.isDataLoaded = true;
    },
    loadOffer: (state, {payload}) => {state.offer = payload},
    loadComments: (state, {payload}) => {state.comments = payload},
    loadFavorites: (state, {payload}) => {state.favorites = payload},
    loadOffersNearBy: (state, {payload}) => {state.offersNearBy = payload},
  },
});

export const {loadOfffers, loadOffer, loadComments, loadFavorites, loadOffersNearBy} = dataProcess.actions;
