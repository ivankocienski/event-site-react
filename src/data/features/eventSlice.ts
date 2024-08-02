// import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// very important!

/* interface Event {
    id: number;
    name: string;
    description: string;
    summary:string;
    startDate: Date;
    endDate: Date;
    publisherUrl: string;
    address: {
        streetAddress: string;
        postalCode: string;
    };
    organizer: { id: number };
} */

interface EventAbbr {
    id: number;
    summary: string;
    startDate: Date;
    organizer: { id: number }
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8001',
        //prepareHeaders(headers) {
        //    headers.set('key', value);
        //    return headers;
        //}
    }),
    endpoints: builder => ({
        fetchEvents: builder.query<EventAbbr[], void>({ // fetchEvents: builder.query<EventAbbr [], number>   <-- for taking arguments
            // query(limit) {
            //     return `/events?limit=${limit}`;
            // }
            query: () => '/events'
        })
    })
});

export const { useFetchEventsQuery } = apiSlice;