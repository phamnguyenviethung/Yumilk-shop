import { api } from './api';
export const orderApi = api.injectEndpoints({
  endpoints: build => ({
    checkOut: build.mutation({
      query: data => ({
        url: '/checkout',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      providesTags: ['Cart', 'Fee'],
    }),
    getShippingFee: build.query({
      query: params => ({
        url: '/shipping/fee',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Fee'],
    }),
  }),
});

export const { useGetShippingFeeQuery, useCheckOutMutation } = orderApi;
