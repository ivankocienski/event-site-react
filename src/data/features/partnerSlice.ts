import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export enum PartnerLoadState {
    NEW,
    PENDING,
    FAILED,
    FULFILLED
};

export interface PartnerAbbrType {
    name: string,
    id: number,
    summary: string,
}

interface PartnerState {
    state: PartnerLoadState,
    partners: PartnerAbbrType [];
}

const initialState: PartnerState = {
    state: PartnerLoadState.NEW,
    partners: []
};

export const fetchPartners = createAsyncThunk<PartnerAbbrType []>(
    'partners/fetchPartners',
    async () => {
        // if(state != PartnerLoadState.NEVER) return;

        console.log("fetchPartners thunk!");

        const response = await fetch(`http://localhost:8001/partners`);

        const data = await response.json();
        return data.map( (d: Record<string, any> ): PartnerAbbrType [] => {
            return {
                id: Number.parseInt(d.id),
                name: d.name,
                summary: d.summary
            };
        } );
    }
);

const partnerSlice = createSlice({
    name: 'partner',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.state = PartnerLoadState.FULFILLED;
                state.partners = action.payload;
            })
            .addCase(fetchPartners.pending, (state, action) => {
                state.state = PartnerLoadState.PENDING;
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.state = PartnerLoadState.PENDING;
                state.partners = [];
            });
    }
});

// export const {} = partnerSlice.actions;
export default partnerSlice.reducer;
