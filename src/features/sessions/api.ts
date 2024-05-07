import type { StartSessionResponse, StartSessionParams } from './types';

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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useStartSessionMutation } = sessionsApi;
