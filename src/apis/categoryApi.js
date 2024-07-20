import { api } from './api';
export const categoryApi = api.injectEndpoints({
  endpoints: build => ({
    getAllCategory: build.query({
      query: params => ({
        url: '/products/categories',
        method: 'GET',
        params: {
          isActive: true,
          ...params,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Category'],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
