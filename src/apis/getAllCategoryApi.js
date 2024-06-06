import { api } from './api';
export const getAllCategoryApi = api.injectEndpoints({
  endpoints: build => ({
    getAllCategory: build.query({
      query: () => ({
        url: '/products/categories',
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Category'],
    }),
  }),
});

export const { useGetAllCategoryQuery } = getAllCategoryApi;