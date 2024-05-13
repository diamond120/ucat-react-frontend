import type { SessionsState } from './types';

import { createSlice } from '@reduxjs/toolkit';
import { sessionsApi } from './api';

const INITIAL_STATE: SessionsState = {
  current_session: {
    id: null,
    section_id: null,
    question_id: null,
    started_at: null,
    finished_at: null,
    completed: 0,
    package: null,
    sections: [],
    remaining_time: 0,
  },
  current_question_response: null,
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
    builder.addMatcher(sessionsApi.endpoints.getSession.matchFulfilled, (state, { payload, meta }) => {
      state.current_session = { ...payload, id: meta.arg.originalArgs.session_id };
    });
    builder.addMatcher(sessionsApi.endpoints.getQuestionResponse.matchFulfilled, (state, { payload }) => {
      state.current_session = { ...state.current_session, question_id: payload.question_id };
      state.current_question_response = { ...payload };
    });
    builder.addMatcher(sessionsApi.endpoints.putQuestionResponse.matchFulfilled, (state, { payload }) => {
      if (state.current_question_response) {
        state.current_question_response = {
          ...state.current_question_response,
          value: payload.value,
          flagged: payload.flagged ? 1 : 0,
        };
      }
    });
    builder.addMatcher(sessionsApi.endpoints.putSelection.matchFulfilled, (state) => {
      state.current_question_response = null;
    });
  },
});

export default sessionsSlice.reducer;
