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
      invalidatesTags: ['Cart', 'Fee'],
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
    getOrderHistory: build.query({
      query: params => ({
        url: '/customer/orders',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useGetShippingFeeQuery,
  useCheckOutMutation,
  useGetOrderHistoryQuery,
} = orderApi;
