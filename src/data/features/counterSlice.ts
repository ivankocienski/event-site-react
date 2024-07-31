// DUCKS pattern

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
    numPartners: number;
    numEvents: number;
}

const initialState: CounterState = {
    value: 0,
    numPartners: 0,
    numEvents: 0
};

interface CounterType {
    numPartners: number;
    numEvents: number;
}

//
// thunks
//

export const fetchCounts = createAsyncThunk<CounterType>(
    'counter/fetchCounts',
    async () => {
        console.log("fetchCounts thunk!");

        const response = await fetch(`http://localhost:8001/`);

        const data = await response.json();

        return {
            numEvents: data.eventCount,
            numPartners: data.partnerCount
        };
    }
);


//
// slice
//

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            /*
            const newState = {...state};
            newState.value++;
            return newState;
            */
            
            state.value++; // uses immer
        },
        decremented(state) {
            state.value--; // uses immer
        },
        reset(state) {
            state.value = 0; // uses immer
        },

        // for passing arguments to actions
        incrementByNumber(state, action: PayloadAction<number>) {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCounts.fulfilled, (state, action) => {
            console.log("fetch count reducer called");
            state.numEvents = action.payload.numEvents;
            state.numPartners = action.payload.numPartners;
        });
    }
});

export const { incremented, decremented, reset, incrementByNumber } = counterSlice.actions;

export default counterSlice.reducer;