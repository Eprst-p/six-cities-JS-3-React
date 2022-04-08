import {formSubmit, chooseOfferID, changeSortOption, changeCity, interfaceProcess, initialState } from "./interface-process";
import { SortOption } from "../../settings/sort-options";
import { InterfaceProcess } from "../../types/state";
import { name, datatype } from "faker";

const fakeCities = Array.from({length: 6}, name.title)

const initialFakeState: InterfaceProcess = {
  isFormDisabled: false,
  chosenOfferID: 0,
  cities: fakeCities,
  sortOption: SortOption.Popular,
  city: fakeCities[0],
};

describe('Reducer: interface-process', () => {
  it('without additional parameters should return initial state', () => {
    expect(interfaceProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change in store field isFormDisabled(boolean) to opposite', () => {
    expect(interfaceProcess.reducer(initialFakeState, formSubmit(true)))
      .toEqual({...initialFakeState, isFormDisabled: true});
    expect(interfaceProcess.reducer({...initialFakeState, isFormDisabled: true}, formSubmit(false)))
      .toEqual({...initialFakeState, isFormDisabled: false});
  });

  it('should change chooseOfferID in store to payload', () => {
    const id = datatype.number;
    expect(interfaceProcess.reducer(initialFakeState, chooseOfferID(id)))
      .toEqual({...initialFakeState, chosenOfferID: id});
  });

  it('should change SortOption in store to another', () => {
    expect(interfaceProcess.reducer(initialFakeState, changeSortOption(SortOption.TopRated)))
      .toEqual({...initialFakeState, sortOption: SortOption.TopRated});
    expect(interfaceProcess.reducer(initialFakeState, changeSortOption(SortOption.PriceHigh)))
      .toEqual({...initialFakeState, sortOption: SortOption.PriceHigh});
  });

  it('should change city in store to City-17', () => {
    expect(interfaceProcess.reducer(initialFakeState, changeCity('City-17')))
      .toEqual({...initialFakeState, city: 'City-17'});
  });
});
