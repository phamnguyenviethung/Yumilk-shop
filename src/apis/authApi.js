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
    sendActiveMail: build.mutation({
      query: params => ({
        url: '/authentication/activate-account',
        method: 'POST',
        params,
      }),
      transformResponse: res => res.data,
      invalidateTags: ['Auth'],
    }),
    verifyAccount: build.mutation({
      query: token => ({
        url: '/authentication/verify',
        method: 'POST',
        params: { token },
      }),
      transformResponse: res => res.data,
      invalidateTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendActiveMailMutation,
  useVerifyAccountMutation,
} = authApi;
