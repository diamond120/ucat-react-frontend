import type { SessionsState } from './types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    redirect_url: null,
  },
  current_question_response: null,
  isLoadingQuestionResponse: false,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: INITIAL_STATE,
  reducers: {
    updateSectionId(state, action: PayloadAction<number | null>) {
      state.current_session.section_id = action.payload;
    },
    updateQuestionId(state, action: PayloadAction<number | null>) {
      state.current_session.question_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionsApi.endpoints.startSession.matchFulfilled, (state, { payload }) => {
      state.current_session.id = payload.id;
    });
    builder.addMatcher(sessionsApi.endpoints.getSession.matchFulfilled, (state, { payload, meta }) => {
      state.current_session = { ...payload, id: meta.arg.originalArgs.session_id };
    });
    builder.addMatcher(sessionsApi.endpoints.getQuestionResponse.matchPending, (state) => {
      state.isLoadingQuestionResponse = true;
    });
    builder.addMatcher(sessionsApi.endpoints.getQuestionResponse.matchFulfilled, (state, { payload }) => {
      state.current_session = { ...state.current_session, question_id: payload.question_id };
      state.current_question_response = { ...payload };
      state.isLoadingQuestionResponse = false;
    });
    builder.addMatcher(sessionsApi.endpoints.getQuestionResponse.matchRejected, (state) => {
      state.isLoadingQuestionResponse = false;
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

export const { updateSectionId, updateQuestionId } = sessionsSlice.actions;
export default sessionsSlice.reducer;
