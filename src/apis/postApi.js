import { api } from './api';
export const postApi = api.injectEndpoints({
  endpoints: build => ({
    getPostList: build.query({
      query: params => ({
        url: '/posts',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
    }),
    getPostDetail: build.query({
      query: id => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
    }),
  }),
});
export const { useGetPostListQuery, useGetPostDetailQuery } = postApi;
