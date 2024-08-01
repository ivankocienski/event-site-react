import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import partnerReducer from './features/partnerSlice';

const reducer = {
  counter: counterReducer,
  partner: partnerReducer
};

/*
reducers are combined automatically with combineReducer when an object is sent in
*/

const store = configureStore({
  reducer: reducer
});

export default store;

// export handy TS auto-generated types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// (ReturnType is TS a built-in)