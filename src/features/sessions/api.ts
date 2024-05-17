import type {
  StartSessionResponse,
  StartSessionParams,
  GetSessionResponse,
  GetSessionParams,
  EndSessionResponse,
  EndSessionParams,
  PutSectionResponse,
  PutSectionParams,
  GetQuestionResponse,
  GetQuestionParams,
  PutQuestionResponse,
  PutQuestionParams,
} from './types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as variables from 'constants/variables';

export const sessionsApi = createApi({
  reducerPath: 'sessionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${variables.API_URL}/sessions`,
  }),
  endpoints: (builder) => ({
    startSession: builder.mutation<StartSessionResponse, StartSessionParams>({
      query: (params) => ({ url: '', method: 'POST', body: params }),
    }),
    getSession: builder.query<GetSessionResponse, GetSessionParams>({
      query: ({ session_id }) => ({ url: `/${session_id}` }),
    }),
    endSession: builder.mutation<EndSessionResponse, EndSessionParams>({
      query: ({ session_id }) => ({ url: `/${session_id}`, method: 'PUT' }),
    }),
    getQuestionResponse: builder.query<GetQuestionResponse, GetQuestionParams>({
      query: ({ session_id, question_id }) => ({ url: `/${session_id}/questions/${question_id}` }),
    }),
    putQuestionResponse: builder.mutation<PutQuestionResponse, PutQuestionParams>({
      query: ({ session_id, question_id, value, flagged }) => ({
        url: `/${session_id}/questions/${question_id}`,
        method: 'POST',
        body: { value, flagged },
      }),
    }),
    putSelection: builder.mutation<PutSectionResponse, PutSectionParams>({
      query: ({ session_id, section_id }) => ({ url: `/${session_id}/sections/${section_id}`, method: 'PUT' }),
    }),
  }),
});

export const {
  useStartSessionMutation,
  useGetSessionQuery,
  useEndSessionMutation,
  useGetQuestionResponseQuery,
  usePutQuestionResponseMutation,
  usePutSelectionMutation,
} = sessionsApi;
