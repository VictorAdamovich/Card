import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { loginReducer } from '../features/login/login-reducer';
import { registerReducer } from '../features/register/register-reducer';

import { appReducer } from './app-reducer';

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  register: registerReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// @ts-ignore
window.state = store.getState();
