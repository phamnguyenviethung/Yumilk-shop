import { api } from './api';
export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: data => ({
        url: '/authentication/login',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidateTags: ['Auth'],
    }),
    register: build.mutation({
      query: data => ({
        url: '/authentication/sign-up',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidateTags: ['Auth'],
    }),
    activeAccount: build.mutation({
      query: data => ({
        url: '/authentication/active-account',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidateTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useActiveAccountMutation,
} = authApi;
