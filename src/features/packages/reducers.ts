import type { RootState } from 'store';
import type { Package, PackagesState } from './types';

import { createSlice } from '@reduxjs/toolkit';
import { packagesApi } from './api';

const INITIAL_STATE: PackagesState = {
  data: [],
};

const packagesSlice = createSlice({
  name: 'packages',
  initialState: INITIAL_STATE,
  reducers: {
    // Define any custom reducers here if needed
  },
  extraReducers: (builder) => {
    builder.addMatcher(packagesApi.endpoints.getPackages.matchFulfilled, (state, { payload }) => {
      state.data = payload;
    });
  },
});

export default packagesSlice.reducer;

// Selector with explicit return type
export const selectPackages = (state: RootState): Package[] => state.packages.data;
