import { isWindowExist } from '@/utils/isTypeOfWindow';
import { useMemo } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';

let store;

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;

function initStore(initialState) {
  const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
    serialize: true
  });

  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));
}

export const initializeStore = preloadedState => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    store = undefined;
  }

  if (isWindowExist()) return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
