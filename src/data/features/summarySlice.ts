

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import { Summary } from '../types';
// import { getSummary } from '../api';

// // overview slice that just pulls event/partner count from API

// //
// // thunk
// //

// export const loadSummary = createAsyncThunk(
//   "summary/load",
//   async () => {
//     return await getSummary();
//   }
// );


// //
// // slice
// //

// export const summarySlice = createSlice({
//   name: 'summary',
//   initialState: {
//     partnerCount: 0,
//     eventCount: 0
//   },
//   reducers: { // TODO: figure out how to load data here
//   /*  setSummary(_, action): Summary {
//       return action.payload;
//     } */
//   },
//   extraReducers: (builder) => {
//     builder.addCase(loadSummary.fulfilled, (_, action) => {
//       console.log("extraReducers: loadSummary.fulfilled: payload=", action.payload);
//       return action.payload;
//     });
//   }
// });

