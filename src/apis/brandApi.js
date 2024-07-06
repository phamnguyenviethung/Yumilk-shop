import { api } from './api';
export const brandApi = api.injectEndpoints({
  endpoints: build => ({
    getAllBrand: build.query({
      query: params => ({
        url: '/products/brands',
        method: 'GET',
        params: {
          isActive: true,
          pageSize: 1000,
          ...params,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Brand'],
    }),
  }),
});

export const { useGetAllBrandQuery } = brandApi;
