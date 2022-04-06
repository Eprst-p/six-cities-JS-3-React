import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../settings/name-space';
import {dataProcess} from './data-process/data-process';
import {userProcess} from './user-process/user-process';
import {interfaceProcess} from './interface-process/interface-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Interface]: interfaceProcess.reducer,
});
