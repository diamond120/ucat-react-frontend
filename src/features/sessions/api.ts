import type {
  StartSessionResponse,
  StartSessionParams,
  GetSessionResponse,
  GetSessionParams,
  GetSectionResponse,
  GetSectionParams,
  GetQuestionResponse,
  GetQuestionParams,
  PutQuestionResponse,
  PutQuestionParams,
} from './types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as variables from 'constants/variables';

// Define a service using a base URL and expected endpoints
export const sessionsApi = createApi({
  reducerPath: 'sessionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${variables.API_URL}/sessions`,
  }),
  endpoints: (builder) => ({
    startSession: builder.mutation<StartSessionResponse, StartSessionParams>({
      query: ({ user_id, package_id }) => ({ url: '', method: 'POST', body: { user_id, package_id } }),
    }),
    getSession: builder.query<GetSessionResponse, GetSessionParams>({
      query: ({ session_id }) => ({ url: `/${session_id}` }),
    }),
    getQuestionResponse: builder.query<GetQuestionResponse, GetQuestionParams>({
      query: ({ session_id, question_id }) => ({ url: `/${session_id}/questions/${question_id}` }),
    }),
    putQuestionResponse: builder.query<PutQuestionResponse, PutQuestionParams>({
      query: ({ session_id, question_id, value, flagged }) => ({
        url: `/${session_id}/questions/${question_id}`,
        method: 'POST',
        body: { value, flagged },
      }),
    }),
    getSelection: builder.query<GetSectionResponse, GetSectionParams>({
      query: ({ session_id, section_id }) => ({ url: `/${session_id}/sections/${section_id}` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useStartSessionMutation, useGetSessionQuery, useGetQuestionResponseQuery, usePutQuestionResponseQuery } =
  sessionsApi;
