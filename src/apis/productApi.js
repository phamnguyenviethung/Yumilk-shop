import { api } from './api';
import PRODUCT from '@/constants/product';
export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getSellingProduct: build.query({
      query: ({ params, queryStr }) => {
        return {
          url: `/products?` + (queryStr ? queryStr : ''),
          params: {
            isActive: true,
            status: PRODUCT.SELLING_STATUS,
            pageSize: 15,
            ...params,
          },
        };
      },
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    getDescriptionInfoById: build.query({
      query: id => ({
        url: `/products/${id}`,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    getAttributeValueById: build.query({
      query: id => ({
        url: `/products/${id}/attributes/values`,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    getProductImgages: build.query({
      query: id => ({
        url: `/products/${id}/images/`,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    getBrandInfoById: build.query({
      query: id => ({
        url: `/products/brands/${id}`,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    getFeedbackByProductId: build.query({
      query: productId => ({
        url: `/products/${productId}/reviews`,
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
  useGetDescriptionInfoByIdQuery,
  useGetAttributeValueByIdQuery,
  useGetBrandInfoByIdQuery,
  useGetFeedbackByProductIdQuery,
  useSearchProductQuery,
  useGetProductDetailQuery,
  useGetProductImgagesQuery,
} = productApi;
