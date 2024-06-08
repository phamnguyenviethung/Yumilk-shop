import { api } from './api';
export const cartApi = api.injectEndpoints({
  endpoints: build => ({
    getCart: build.query({
      query: ({ userID }) => ({
        url: `/user/${userID}/cart`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Cart'],
    }),
    addToCart: build.mutation({
      query: ({ userID, data }) => ({
        url: `/user/${userID}/cart/`,
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Cart'],
    }),
    changQuantity: build.mutation({
      query: ({ userID, productID }) => ({
        url: `/user/${userID}/cart/${productID}`,
        method: 'PATCH',
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
  useChangQuantityMutation,
  useAddToCartMutation,
} = cartApi;
