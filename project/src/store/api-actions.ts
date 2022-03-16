import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../store';
import {store} from '../store';
import {offerTypes} from '../types/offer-types';
import {loadOfffers} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../settings/api-routes';
//import {AuthData} from '../types/auth-data';
//import {UserData} from '../types/user-data';

export const fetchOffersAction = createAsyncThunk(
  'data/loadOffers',
  async () => {
    const {data} = await api.get<offerTypes>(APIRoute.Hotels);
    store.dispatch(loadOfffers(data));
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
