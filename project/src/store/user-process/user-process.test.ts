import {setAuthorizationStatus, saveUserEmail, userProcess} from "./user-process";
import { UserProcess } from "../../types/state";
import { AuthorizationStatus } from "../../settings/auth-status";
import { internet } from "faker";

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

describe('Reducer: data-process', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change authorizationStatus in store', () => {
    expect(userProcess.reducer(initialState, setAuthorizationStatus(AuthorizationStatus.Auth)))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.Auth});
    expect(userProcess.reducer(initialState, setAuthorizationStatus(AuthorizationStatus.NoAuth)))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.NoAuth});
  });

  it('should save userEmail to store', () => {
    const email = internet.email
    expect(userProcess.reducer(initialState, saveUserEmail(email)))
      .toEqual({...initialState, userEmail: email});
  });
});
