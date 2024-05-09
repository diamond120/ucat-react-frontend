import type { RootState } from 'store';
import type { Session, Section, Question, QuestionResponse } from './types';
import * as helpers from './helpers';

import { createSelector } from 'reselect';

export const selectCurrentSession = (state: RootState): Session => state.sessions.current_session;

export const selectCurrentSection = createSelector([selectCurrentSession], (session): Section | null => {
  return session && session.section_id
    ? session.sections.find((section) => section.id === session.section_id) ?? null
    : null;
});

export const selectPrevSection = createSelector([selectCurrentSession], (session): Section | null => {
  if (!session?.sections?.length) {
    return null;
  }

  const sectionIndex = helpers.findCurrentSectionIndex(session);
  // Return the previous section if it exists
  if (sectionIndex > 0) {
    return session.sections[sectionIndex - 1];
  }

  return null; // No previous section if current is the first or not found
});

export const selectNextSection = createSelector([selectCurrentSession], (session): Section | null => {
  if (!session?.sections?.length) {
    return null;
  }

  const sectionIndex = helpers.findCurrentSectionIndex(session);
  // Return the next section if it exists
  if (sectionIndex !== -1 && sectionIndex + 1 < session.sections.length) {
    return session.sections[sectionIndex + 1];
  }

  // Return the first section if no current section is set
  return session.sections?.[0] ?? null;
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
  [selectCurrentSession, selectCurrentSection, selectCurrentQuestionIndex],
  (session, section, questionIndex): Question['id'] | null => {
    return section && questionIndex && questionIndex.current > 0
      ? section.questions[questionIndex.current - 1].id
      : null;
  },
);

export const selectNextQuestionId = createSelector(
  [selectCurrentSession, selectCurrentSection, selectCurrentQuestionIndex],
  (session, section, questionIndex): Question['id'] | null => {
    // Check if the section and questions exist
    if (!section || !section.questions.length) {
      return null;
    }

    // If there's no current question ID in the session, return the first question's ID
    if (!session?.question_id) {
      return section.questions[0]?.id || null; // Safeguard against empty questions array
    }

    // If there is a valid questionIndex, calculate the next question ID
    if (questionIndex && questionIndex.current < questionIndex.total - 1) {
      // Make sure the next question index is within the questions array bounds
      const nextQuestionIndex = questionIndex.current + 1;
      return section.questions[nextQuestionIndex]?.id || null; // Safeguard against undefined question
    }

    // Return null if there is no next question or indices are out of bounds
    return null;
  },
);
