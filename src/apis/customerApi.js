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
      invalidateTags: ['Auth', 'Customer'],
    }),
  }),
});

export const { useUpdateProfileMutation, useGetMeQuery } = customerApi;
