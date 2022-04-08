import {createAsyncThunk} from '@reduxjs/toolkit';
import {offerTypes, offerType} from '../types/offer-types';
import {CommentType, NewCommentType, CommentData} from '../types/comment-type';
import {redirectToRoute} from './action';
import {loadOfffers, loadOffer, loadComments, loadFavorites, loadOffersNearBy} from './data-process/data-process';
import {setAuthorizationStatus, saveUserEmail} from './user-process/user-process';
import {formSubmit} from './interface-process/interface-process';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../settings/api-routes';
import {generatePath} from "react-router";
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {AuthorizationStatus} from '../settings/auth-status';
import {errorHandle} from '../services/error-handle';
import {AppRoute} from '../settings/app-routes';
import {Favorite} from '../settings/favorite-status';
import throttle from 'lodash.throttle'
import {AxiosInstance} from 'axios';
import {State, AppDispatch} from '../types/state';


const setPromiseWaiter = (timer = 300) => new Promise(resolve => setTimeout(resolve, timer));

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<offerTypes>(APIRoute.Hotels);
      await setPromiseWaiter(500);
      dispatch(loadOfffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<offerType>(generatePath(APIRoute.Hotel, {id: `${id}`}));
      await setPromiseWaiter();
      dispatch(loadOffer(data));
    } catch (error) {
      errorHandle(error);
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchOffersNearByAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffersNearBy',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<offerTypes>(generatePath(APIRoute.HotelsNearby, {id: `${id}`}));
      dispatch(loadOffersNearBy(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadFavorites',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<offerTypes>(generatePath(APIRoute.Favorite));
      await setPromiseWaiter();
      dispatch(loadFavorites(data));
    } catch (error) {
      throttle(() => errorHandle(error), 800);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadComments',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<CommentType[]>(generatePath(APIRoute.Comments, {id: `${id}`}));
      await setPromiseWaiter();
      dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(saveUserEmail(data.email))
    } catch (error) {
      throttle(() => errorHandle(error), 800);
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(saveUserEmail(email));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(saveUserEmail(''));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const pushCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/commentPush',
  async (newComment, {dispatch, extra: api}) => {
    try {
      await api.post<NewCommentType>(generatePath(APIRoute.Comments, {id: `${newComment.id}`}), newComment.newComment);
      await setPromiseWaiter();
      dispatch(formSubmit(false));
    } catch (error) {
      errorHandle(error);
      dispatch(formSubmit(false));
    }
  },
);

export const changeFavoritesAction = createAsyncThunk<void, offerType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changeFavorite',
  async (offer, {dispatch, extra: api}) => {
    const favoriteStatus = offer.isFavorite;
    try {
      await api.post<offerType>(generatePath(APIRoute.FavoriteHotel, {id: `${offer.id}`, status: `${favoriteStatus ? Favorite.Remove : Favorite.Add}` }), offer);
    } catch (error) {
      errorHandle(error);
      dispatch(redirectToRoute(AppRoute.Login));
    }
  },
);

