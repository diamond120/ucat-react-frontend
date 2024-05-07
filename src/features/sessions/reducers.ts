import type { RootState } from 'store';
import type { SessionsState } from './types';

import { createSlice } from '@reduxjs/toolkit';
import { sessionsApi } from './api';

const INITIAL_STATE: SessionsState = {
  current_session_id: null,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: INITIAL_STATE,
  reducers: {
    // Define any reducers here if needed in the future
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionsApi.endpoints.startSession.matchFulfilled, (state, { payload }) => {
      state.current_session_id = payload.id;
    });
  },
});

export default sessionsSlice.reducer;

export const selectCurrentSessionId = (state: RootState): string | null => state.sessions.current_session_id;
