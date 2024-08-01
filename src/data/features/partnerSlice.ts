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

interface PartnerContactType {
    email: string,
    telephone: string
}

interface PartnerAddressType {
    streetAddress: string,
    postalCode: string
}

export interface PartnerFullType {
    name: string,
    id: number,
    summary: string,
    description: string,
    contact: PartnerContactType,
    url: string,
    address: PartnerAddressType,
    logo: null | string
}

interface PartnerState {
    state: PartnerLoadState,
    partners: PartnerAbbrType [],
    showPartner: PartnerFullType | null
}

const initialState: PartnerState = {
    state: PartnerLoadState.NEW,
    partners: [],
    showPartner: null
};

export const fetchPartners = createAsyncThunk<PartnerAbbrType []>(
    'partners/fetchPartners',
    async () => {
        // if(state != PartnerLoadState.NEVER) return;

        console.log("fetchPartners thunk!");

        const response = await fetch(`http://localhost:8001/partners`);

        const data = await response.json();
        return data.map( (d: Record<string, any> ): PartnerAbbrType => {
            return {
                id: Number.parseInt(d.id),
                name: d.name,
                summary: d.summary
            };
        } );
    }
);

export const fetchSinglePartner = createAsyncThunk<PartnerFullType, number>(
    'partners/fetchPartner',
    async (id) => {
        // if(state != PartnerLoadState.NEVER) return;

        console.log("fetchPartner(id) thunk!");
        const url = `http://localhost:8001/partners/${id}`;
        console.log("  url=", url);

        const response = await fetch(url);

        const data = await response.json();
        return {
            ...data,
            id:  Number.parseInt(data.id)
        };
    }
);

const partnerSlice = createSlice({
    name: 'partner',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // partners index
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
            })

            // show partner
            .addCase(fetchSinglePartner.fulfilled, (state, action) => {
                state.showPartner = action.payload;
            })
            .addCase(fetchSinglePartner.pending, (state, action) => {
                state.showPartner = null;
            })
            .addCase(fetchSinglePartner.rejected, (state, action) => {
                state.showPartner = null;
            })

    }
});

// export const {} = partnerSlice.actions;
export default partnerSlice.reducer;
