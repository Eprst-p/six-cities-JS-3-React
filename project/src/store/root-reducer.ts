import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../settings/name-space';
import {dataProcess} from './data-process/data-process';
import {userProcess} from './user-process/user-process';
import {interfaceProcess} from './interface-process/interface-process';

export const rootReducer = combineReducers({
  [NameSpace.data]: dataProcess.reducer,
  [NameSpace.user]: userProcess.reducer,
  [NameSpace.interface]: interfaceProcess.reducer,
});
