import type { RootState } from 'store';
import type { Session, Section, Question, QuestionResponse } from './types';

import { createSelector } from 'reselect';

export const selectCurrentSession = (state: RootState): Session => state.sessions.current_session;

export const selectCurrentSection = createSelector([selectCurrentSession], (session): Section | null => {
  return session && session.section_id
    ? session.sections.find((section) => section.id === session.section_id) ?? null
    : null;
});

export const selectCurrentQuestionResponse = (state: RootState): QuestionResponse | null =>
  state.sessions.current_question_response;

export const selectCurrentSessionId = createSelector([selectCurrentSession], (session) => session.id);

export const selectCurrentPackage = createSelector([selectCurrentSession], (session) => session.package);

export const selectCurrentQuestionIndex = createSelector(
  [selectCurrentSection, selectCurrentSession],
  (section, session): { current: number; total: number } | null => {
    if (section) {
      const currentQuestionIndex = section.questions.findIndex((question) => question.id === session.question_id);
      if (currentQuestionIndex !== -1) {
        return { current: currentQuestionIndex, total: section.questions.length };
      }
    }
    return null;
  },
);

export const selectPrevQuestionId = createSelector(
  [selectCurrentSection, selectCurrentQuestionIndex],
  (section, questionIndex): Question['id'] | null => {
    return section && questionIndex && questionIndex.current > 0
      ? section.questions[questionIndex.current - 1].id
      : null;
  },
);

export const selectNextQuestionId = createSelector(
  [selectCurrentSection, selectCurrentQuestionIndex],
  (section, questionIndex): Question['id'] | null => {
    return section && questionIndex && questionIndex.current < questionIndex.total - 1
      ? section.questions[questionIndex.current + 1].id
      : null;
  },
);
