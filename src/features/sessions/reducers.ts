import type { RootState } from 'store';
import type { SessionsState } from './types';

import { createSlice } from '@reduxjs/toolkit';
import { sessionsApi } from './api';

const INITIAL_STATE: SessionsState = {
  current_session: {
    id: null,
    section_id: null,
    started_at: null,
    finished_at: null,
    completed: null,
    package: null,
    sections: [],
  },
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: INITIAL_STATE,
  reducers: {
    // Define any reducers here if needed in the future
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionsApi.endpoints.startSession.matchFulfilled, (state, { payload }) => {
      state.current_session.id = payload.id;
    });
    builder.addMatcher(sessionsApi.endpoints.getSession.matchFulfilled, (state, { payload }) => {
      state.current_session = { ...payload };
    });
  },
});

export default sessionsSlice.reducer;

export const selectCurrentSession = (state: RootState): SessionsState['current_session'] =>
  state.sessions.current_session;
export const selectCurrentSessionId = (state: RootState): string | null => state.sessions.current_session.id;
