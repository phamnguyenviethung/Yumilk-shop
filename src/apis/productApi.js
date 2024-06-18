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
    searchProduct: build.query({
      query: keyword => ({
        url: `/products`,
        method: 'GET',
        params: {
          SearchTerm: keyword,
          isActive: true,
          SortColumn: 'rating',
          SortOrder: 'desc',
          pageSize: 5,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    getProductDetail: build.query({
      query: id => ({
        url: `/products/${id}`,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetSellingProductQuery,
  useSearchProductQuery,
  useGetProductDetailQuery,
} = productApi;
