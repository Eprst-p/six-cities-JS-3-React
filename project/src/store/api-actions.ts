import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../store';
import {store} from '../store';
import {offerTypes, offerType} from '../types/offer-types';
import {CommentType, NewCommentType, CommentData} from '../types/comment-type';
import {loadOfffers, loadFavorites, loadComments, loadOffer, loadOffersNearBy, requireAuthorization, saveUserEmail, userCommentPush, redirectToRoute} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../settings/api-routes';
import {generatePath} from "react-router";
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {AuthorizationStatus} from '../settings/auth-status';
import {errorHandle} from '../services/error-handle';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../settings/app-routes';


const setPromiseWaiter = (timer = 500) => new Promise(resolve => setTimeout(resolve, timer));

export const fetchOffersAction = createAsyncThunk(
  'data/loadOffers',
  async () => {
    try {
      const {data} = await api.get<offerTypes>(APIRoute.Hotels);
      await setPromiseWaiter(800);
      store.dispatch(loadOfffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk(
  'data/loadOffer',
  async (id:number) => {
    try {
      const {data} = await api.get<offerType>(generatePath(APIRoute.Hotel, {id: `${id}`}));
      await setPromiseWaiter();
      store.dispatch(loadOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOffersNearByAction = createAsyncThunk(
  'data/loadOffersNearBy',
  async (id:number) => {
    try {
      const {data} = await api.get<offerTypes>(generatePath(APIRoute.HotelsNearby, {id: `${id}`}));
      store.dispatch(loadOffersNearBy(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/loadFavorites',
  async () => {
    try {
      const {data} = await api.get<offerTypes>(APIRoute.Favorite);
      await setPromiseWaiter();
      store.dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  'data/loadComments',
  async (id:number) => {
    try {
      const {data} = await api.get<CommentType[]>(generatePath(APIRoute.Comments, {id: `${id}`}));
      store.dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(saveUserEmail(email));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(saveUserEmail(''));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const pushCommentAction = createAsyncThunk(
  'user/commentPush',
  async (newComment: CommentData) => {
    try {
      await api.post<NewCommentType>(generatePath(APIRoute.Comments, {id: `${newComment.id}`}), newComment.newComment);
      store.dispatch(userCommentPush(newComment.newComment));
    } catch (error) {
      errorHandle(error);
    }
  },
);

