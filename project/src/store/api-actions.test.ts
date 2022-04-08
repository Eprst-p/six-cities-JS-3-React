import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {checkAuthAction, loginAction, logoutAction, fetchOffersAction, fetchOfferAction, fetchOffersNearByAction, fetchFavoritesAction, fetchCommentsAction, pushCommentAction, changeFavoritesAction} from './api-actions';
import {saveUserEmail, setAuthorizationStatus} from './user-process/user-process';
import {APIRoute} from '../settings/api-routes';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import { makeFakeComments, makeFakeFavorites, makeFakeOffer, makeFakeOffers, makeFakeOffersNearby } from '../mocks/data-mock';
import { loadOfffers, loadOffer, loadOffersNearBy, loadFavorites, loadComments } from './data-process/data-process';
import { datatype, internet } from 'faker';
import { generatePath } from 'react-router-dom';
import { redirectToRoute } from './action';
import { AppRoute } from '../settings/app-routes';
import { AuthorizationStatus } from '../settings/auth-status';
import { formSubmit } from './interface-process/interface-process';
import { Favorite } from '../settings/favorite-status';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should dispatch loadOffers when GET /hotels', async () => {
    const mockOffers = makeFakeOffers;
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(200, mockOffers);
    const store = mockStore();
    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOfffers.toString());
  });

  it('should dispatch loadOffer when GET /hotels/:id', async () => {
    const mockOffer = makeFakeOffer();
    const id = datatype.number();
    mockAPI
      .onGet(generatePath(APIRoute.Hotel, {id: `${id}`}))
      .reply(200, mockOffer);
    const store = mockStore();
    await store.dispatch(fetchOfferAction(id));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffer.toString());
  });

  it('should redirect to not-found when GET /hotels/:id and get bad request', async () => {
    const id = datatype.number();
    mockAPI
      .onGet(generatePath(APIRoute.Hotel, {id: `${id}`}))
      .reply(400, null);
      const store = mockStore();
      await store.dispatch(fetchOfferAction(id));
      expect(store.dispatch(redirectToRoute).type).toContain(redirectToRoute.toString());
  });

  it('should dispatch loadOffersNearBy when GET /hotels/:id/nearby', async () => {
    const mockOffersNearby = makeFakeOffersNearby;
    const id = datatype.number();
    mockAPI
      .onGet(generatePath(APIRoute.HotelsNearby, {id: `${id}`}))
      .reply(200, mockOffersNearby);
    const store = mockStore();
    await store.dispatch(fetchOffersNearByAction(id));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffersNearBy.toString());
  });

  it('should dispatch loadFavorites when GET /favorites', async () => {
    const mockFavorites = makeFakeFavorites;
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFavorites);
    const store = mockStore();
    await store.dispatch(fetchFavoritesAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadFavorites.toString());
  });

  it('should dispatch loadComments when GET /comments/:id', async () => {
    const mockComments = makeFakeComments;
    const id = datatype.number();
    mockAPI
      .onGet(generatePath(APIRoute.Comments, {id: `${id}`}))
      .reply(200, mockComments);
    const store = mockStore();
    await store.dispatch(fetchCommentsAction(id));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadComments.toString());
  });

  it('should dispatch setAuthorizationStatus and saveUserEmail when GET /login', async () => {
    const mockUserData = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: internet.email.toString(),
    }
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, mockUserData);
    const store = mockStore();
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(setAuthorizationStatus.toString());
    expect(actions).toContain(saveUserEmail.toString());
  });

  it('should dispatch setAuthorizationStatus and saveUserEmail when POST /login with login and password, after that should redirect to main', async () => {
    const fakeUser: AuthData = {login: internet.email(), password: internet.password()};
    const {login, password} = fakeUser
    mockAPI
      .onPost(APIRoute.Login, {login, password})
      .reply(200, {token: 'some-secret-token'});
    const store = mockStore();
    await store.dispatch(loginAction(fakeUser));
    expect(store.dispatch(setAuthorizationStatus).type).toEqual(setAuthorizationStatus.toString());
    expect(store.dispatch(saveUserEmail).type).toEqual(saveUserEmail.toString());
    expect(store.dispatch(redirectToRoute).type).toEqual(redirectToRoute.toString());
  });

  it('should dispatch setAuthorizationStatus and saveUserEmail when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);
    const store = mockStore();
    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(setAuthorizationStatus.toString());
    expect(actions).toContain(saveUserEmail.toString());
  });

  it('should dispatch formSubmit when POST /comments/:id', async () => {
    const fakeComment = {comment: datatype.string(50), rating: datatype.number()}
    const fakeCommentData = {newComment: fakeComment, id: datatype.number()};
    mockAPI
      .onPost(generatePath(APIRoute.Comments, {id: `${fakeCommentData.id}`}), fakeCommentData.newComment)
      .reply(200);
    const store = mockStore();
    await store.dispatch(pushCommentAction(fakeCommentData));
    expect(store.dispatch(formSubmit).type).toContain(formSubmit.toString());
  });

  it('should dispatch formSubmit when POST /comments/:id and get bad request', async () => {
    const fakeComment = {comment: datatype.string(50), rating: datatype.number()}
    const fakeCommentData = {newComment: fakeComment, id: datatype.number()};
    mockAPI
      .onPost(generatePath(APIRoute.Comments, {id: `${fakeCommentData.id}`}), fakeCommentData.newComment)
      .reply(400);
    const store = mockStore();
    await store.dispatch(pushCommentAction(fakeCommentData));
    expect(store.dispatch(formSubmit).type).toContain(formSubmit.toString());
  });

  it('should provide correct status, depends on isFavorite feild in offer when POST /favorite/:id/{status(boolean)}', async () => {
    const mockOffer = makeFakeOffer();
    const favoriteStatus = mockOffer.isFavorite;
    const getStatus = (favorite:boolean) => favorite ? Favorite.Remove : Favorite.Add;
    mockAPI
      .onPost(generatePath(APIRoute.FavoriteHotel, {id: `${mockOffer.id}`, status: `${favoriteStatus ? Favorite.Remove : Favorite.Add}` }), mockOffer)
      .reply(200);
    const store = mockStore();
    await store.dispatch(changeFavoritesAction(mockOffer));
    expect(getStatus(true)).toEqual(Favorite.Remove);
    expect(getStatus(false)).toEqual(Favorite.Add);
  });

  it('should redirect to login when POST /favorite/:id/{status(boolean) and get unauthorized request', async () => {
    const mockOffer = makeFakeOffer();
    const favoriteStatus = mockOffer.isFavorite;
    mockAPI
      .onPost(generatePath(APIRoute.FavoriteHotel, {id: `${mockOffer.id}`, status: `${favoriteStatus ? Favorite.Remove : Favorite.Add}` }), mockOffer)
      .reply(401);
    const store = mockStore();
    await store.dispatch(changeFavoritesAction(mockOffer));
    expect(store.dispatch(redirectToRoute).type).toContain(redirectToRoute.toString());
  });
});
