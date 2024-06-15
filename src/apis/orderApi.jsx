import { api } from './api';
export const orderApi = api.injectEndpoints({
  endpoints: build => ({
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

export const { useGetShippingFeeQuery } = orderApi;
