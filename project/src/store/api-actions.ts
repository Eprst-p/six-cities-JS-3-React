/* eslint-disable no-console */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../store';
import {store} from '../store';
import {offerTypes, offerType} from '../types/offer-types';
import {commentType} from '../types/comment-type';
import {loadOfffers, loadFavorites, loadComments, loadOffer, loadOffersNearBy} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../settings/api-routes';
import {generatePath} from "react-router";

//import {AuthData} from '../types/auth-data';
//import {UserData} from '../types/user-data';

export const fetchOffersAction = createAsyncThunk(
  'data/loadOffers',
  async () => {
    const {data} = await api.get<offerTypes>(APIRoute.Hotels);
    store.dispatch(loadOfffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk(
  'data/loadOffer',
  async (id:number) => {
    const {data} = await api.get<offerType>(generatePath(APIRoute.Hotel, {id: `${id}`}));
    store.dispatch(loadOffer(data));
  },
);

export const fetchOffersNearByAction = createAsyncThunk(
  'data/loadOffer',
  async (id:number) => {
    const {data} = await api.get<offerTypes>(generatePath(APIRoute.HotelsNearby, {id: `${id}`}));
    store.dispatch(loadOffersNearBy(data));
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/loadFavorites',
  async () => {
    const {data} = await api.get<offerTypes>(APIRoute.Favorite);
    store.dispatch(loadFavorites(data));
  },
);

export const fetchCommentsAction = createAsyncThunk(
  'data/loadComments',
  async (id:number) => {
    const {data} = await api.get<commentType[]>(generatePath(APIRoute.Comments, {id: `${id}`}));
    store.dispatch(loadComments(data));
  },
);

/*
export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
*/
