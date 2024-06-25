import { api } from './api';
export const customerApi = api.injectEndpoints({
  endpoints: build => ({
    getMe: build.query({
      query: () => ({
        url: '/user/account/profile',
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Auth', 'Customer'],
    }),
    updateProfile: build.mutation({
      query: data => ({
        url: '/user/account/profile',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Auth', 'Customer'],
    }),
    updatePassword: build.mutation({
      query: data => ({
        url: '/user/account/change-password',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Auth', 'Customer'],
    }),
    getMyAddress: build.query({
      query: () => ({
        url: '/user/account/addresses',
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Address'],
    }),
    addNewAddress: build.mutation({
      query: data => ({
        url: '/user/account/addresses',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Address'],
    }),
    updateMyAddress: build.mutation({
      query: data => ({
        url: `/user/account/addresses/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Address'],
    }),
    deleteMyAddress: build.mutation({
      query: id => ({
        url: `/user/account/addresses/${id}`,
        method: 'DELETE',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetMeQuery,
  useGetMyAddressQuery,
  useAddNewAddressMutation,
  useUpdatePasswordMutation,
  useUpdateMyAddressMutation,
  useDeleteMyAddressMutation,
} = customerApi;
