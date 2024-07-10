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
    preOrderCheckOut: build.mutation({
      query: data => ({
        url: '/checkout/preorder',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Cart', 'Fee'],
    }),

    cancelOrder: build.mutation({
      query: id => ({
        url: `/customer/orders/${id}/cancel`,
        method: 'PATCH',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Order'],
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
      query: ({ id, params }) => ({
        url: `/users/${id}/orders`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Order'],
    }),
    getOrderDetail: build.query({
      query: ({ id, userID }) => ({
        url: `/users/${userID}/orders/${id}`,
        method: 'GET',
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
  useGetOrderDetailQuery,
  useCancelOrderMutation,
  usePreOrderCheckOutMutation,
} = orderApi;
