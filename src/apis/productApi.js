import { api } from './api';
import PRODUCT from '@/constants/product';
export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getSellingProduct: build.query({
      query: () => ({
        url: `/products`,
        params: {
          isActive: true,
          status: PRODUCT.SELLING_STATUS,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    autocompleteProduct: build.query({
      //query này sẽ được gọi khi user nhập từ khóa tìm kiếm
      query: ({ keyword }) => ({
        url: `/products`,
        method: 'GET',
        params: {
          SearchTerm: keyword,
          isActive: true,
          SortColumn: 'rating',
          SortOrder: 'desc',
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetSellingProductQuery, useAutocompleteProductQuery } =
  productApi;
