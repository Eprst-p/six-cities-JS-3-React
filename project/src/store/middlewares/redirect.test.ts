import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {redirectToRoute} from '../action';
import { AppRoute } from '../../settings/app-routes';
import {State} from '../../types/state';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history/browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toContainEqual(redirectToRoute(AppRoute.Login));
  });

  it('should be redirect to /', () => {
    store.dispatch(redirectToRoute(AppRoute.Main));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    expect(store.getActions()).toContainEqual(redirectToRoute(AppRoute.Main));
  });

  it('should be redirect to /not-found', () => {
    store.dispatch(redirectToRoute(AppRoute.NotFound));
    expect(fakeHistory.location.pathname).toBe(AppRoute.NotFound);
    expect(store.getActions()).toContainEqual(redirectToRoute(AppRoute.NotFound));
  });

  it('should not to be redirect /login because of bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Login});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});
