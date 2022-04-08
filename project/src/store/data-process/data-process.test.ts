import {loadOfffers, loadOffer, loadComments, loadFavorites, loadOffersNearBy, dataProcess} from "./data-process";
import { DataProcess } from "../../types/state";
import { makeFakeOffers, makeFakeOffer, makeFakeFavorites, makeFakeOffersNearby, makeFakeComments } from "../../mocks/data-mock";

const initialState: DataProcess = {
  offers: [],
  offer: undefined,
  comments: [],
  favorites: [],
  offersNearBy: [],
  isDataLoaded: false,
};

describe('Reducer: data-process', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should load offers to store and change isDataLoaded to true', () => {
    expect(dataProcess.reducer(initialState, loadOfffers(makeFakeOffers)))
      .toEqual({...initialState, offers: makeFakeOffers, isDataLoaded: true});
  });

  it('should load offer to store', () => {
    const mockOffer = makeFakeOffer();
    expect(dataProcess.reducer(initialState, loadOffer(mockOffer)))
      .toEqual({...initialState, offer: mockOffer});
  });

  it('should load favorites to store', () => {
    expect(dataProcess.reducer(initialState, loadFavorites(makeFakeFavorites)))
      .toEqual({...initialState, favorites: makeFakeFavorites});
  });

  it('should load comments to store', () => {
    expect(dataProcess.reducer(initialState, loadOffersNearBy(makeFakeComments)))
      .toEqual({...initialState, offersNearBy: makeFakeComments});
  });

  it('should load offers-nearby to store', () => {
    expect(dataProcess.reducer(initialState, loadComments(makeFakeOffersNearby)))
      .toEqual({...initialState, comments: makeFakeOffersNearby});
  });
});
