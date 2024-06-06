import { api } from './api';
export const getAllBrandApi = api.injectEndpoints({
  endpoints: build => ({
    getAllBrand: build.query({
      query: () => ({
        url: '/products/brands',
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Brand'],
    }),
  }),
});

export const { useGetAllBrandQuery } = getAllBrandApi;