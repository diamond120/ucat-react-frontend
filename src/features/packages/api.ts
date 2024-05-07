import type { Package } from './types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as variables from 'constants/variables';

// Define a service using a base URL and expected endpoints
export const packagesApi = createApi({
  reducerPath: 'packagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${variables.API_URL}/packages`,
  }),
  endpoints: (builder) => ({
    getPackages: builder.query<Package[], void>({
      query: () => ({ url: '' }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPackagesQuery } = packagesApi;
