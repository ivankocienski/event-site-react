import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import partnerReducer from './features/partnerSlice';
import { apiSlice } from './features/eventSlice';

const reducer = {
  counter: counterReducer,
  partner: partnerReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
};

/*
reducers are combined automatically with combineReducer when an object is sent in
*/

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddlewear => {
    return getDefaultMiddlewear()
      .concat(apiSlice.middleware);
  }
});

export default store;

// export handy TS auto-generated types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// (ReturnType is TS a built-in)