import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {AuthorizationStatus} from '../../settings/auth-status';
import {UserProcess} from '../../types/state';


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, {payload}) => {state.authorizationStatus = payload},
    saveUserEmail: (state, {payload}) => {state.userEmail = payload},
  },
});

export const {setAuthorizationStatus, saveUserEmail} = userProcess.actions;
