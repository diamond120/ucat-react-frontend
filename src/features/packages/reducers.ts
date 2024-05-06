import type { Package } from './types';

import { createSlice } from '@reduxjs/toolkit';
import { packagesApi } from './api';

const INITIAL_STATE: { data: Package[] } = {
  data: [],
};

const packagesSlice = createSlice({
  name: 'packages',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(packagesApi.endpoints.getPackages.matchFulfilled, (state, { payload }) => {
      state.data = payload;
    });
  },
});

export default packagesSlice.reducer;

export const selectPackages = (state: { packages: { data: Package[] } }) => state.packages.data;
