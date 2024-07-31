// DUCKS pattern

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0
};

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
        }
        /*
        */
    }
});

export const { incremented, decremented, reset, incrementByNumber } = counterSlice.actions;

export default counterSlice.reducer;