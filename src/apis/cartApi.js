import { api } from './api';
export const cartApi = api.injectEndpoints({
  endpoints: build => ({
    getCart: build.query({
      query: ({ userID, params }) => ({
        url: `/user/${userID}/cart`,
        method: 'GET',
        params: {
          isUsingPoint: false,
          ...params,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Cart'],
    }),
    addToCart: build.mutation({
      query: ({ userID, data }) => ({
        url: `/user/${userID}/cart`,
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Cart'],
    }),
    reloadCart: build.mutation({
      query: userID => ({
        url: `/user/${userID}/cart`,
        method: 'PUT',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Cart'],
    }),
    changeQuantity: build.mutation({
      query: ({ userID, productID, data }) => ({
        url: `/user/${userID}/cart/${productID}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: build.mutation({
      query: ({ userID, productID }) => ({
        url: `/user/${userID}/cart/${productID}`,
        method: 'DELETE',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Cart'],
    }),
    clearCart: build.mutation({
      query: ({ userID }) => ({
        url: `/user/${userID}/cart`,
        method: 'DELETE',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useChangeQuantityMutation,
  useAddToCartMutation,
  useReloadCartMutation,
} = cartApi;
