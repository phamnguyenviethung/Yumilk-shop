import { api } from './api';
export const addressApi = api.injectEndpoints({
  endpoints: build => ({
    getProvinces: build.query({
      query: () => ({
        url: '/shipping/provinces',
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Provinces'],
    }),
    getDistricts: build.query({
      query: provinceId => ({
        url: `/shipping/districts/${provinceId}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Districts'],
    }),
    getWards: build.query({
      query: wardId => ({
        url: `/shipping/wards/${wardId}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Address'],
    }),
  }),
});

export const { useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } =
  addressApi;
