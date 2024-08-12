// import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Event, EventAbbr } from '../types';


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
        fetchEvents: builder.query<EventAbbr[], void>({
            query: () => '/events'
        }),

        fetchSingleEvent: builder.query<Event, number>({
            query: id => `/evenst/${id}`
        })
    })
});

export const { useFetchEventsQuery, useFetchSingleEventQuery } = apiSlice;