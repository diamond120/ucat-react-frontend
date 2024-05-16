import type { Package } from '../packages/types';

export type Question = {
  id: number;
  type: 'MC' | 'DD';
  text: string | null;
  image_url: string | null;
  actions: string | null;
  options: string;
  option_image_urls: string | string;
  explanation: string;
  answer: string;
  situation: Situation;
  section_id: Section['id'];
  status: 'UnSeen' | 'InComplete' | 'Completed' | 'Flagged';
};

export type Section = {
  id: number;
  name: string;
  type: 'VR' | 'DM' | 'QR' | 'AR' | 'SJ';
  questions: (Pick<Question, 'id' | 'status'> &
    Pick<QuestionResponse, 'flagged'> & { score: number; duration: number })[];
  correct: number;
  partially_correct: number;
  time: number;
};

export type Situation = {
  id: number;
  image_url: string | null;
  section_id: Section['id'];
  split: 0 | 1;
  text: string | null;
};

export type QuestionResponse = {
  id: number;
  session_id: string;
  question_id: Question['id'];
  question: Question;
  value: string;
  flagged: 0 | 1;
};

export type Session = {
  id: string | null;
  section_id: number | null;
  question_id: number | null;
  started_at: Date | null;
  finished_at: Date | null;
  completed: 0 | 1;
  package: Package | null;
  sections: Section[];
  remaining_time: number;
};

export type SessionsState = {
  current_session: Session;
  current_question_response: QuestionResponse | null;
  isLoadingQuestionResponse: boolean;
};

export type StartSessionResponse = {
  id: string;
};

export type StartSessionParams = {
  user_id: number;
  package_id: number;
};

export type EndSessionResponse = SessionsState['current_session'];

export type EndSessionParams = {
  session_id: string;
};

export type GetSessionResponse = SessionsState['current_session'];

export type GetSessionParams = {
  session_id: string;
};

export type GetQuestionResponse = QuestionResponse;

export type GetQuestionParams = {
  session_id: string;
  question_id: number;
};

export type PutQuestionResponse = {
  flagged: boolean;
  id: QuestionResponse['id'];
  question_id: QuestionResponse['question_id'];
  session_id: QuestionResponse['session_id'];
  value: QuestionResponse['value'];
};

export type PutQuestionParams = {
  session_id: string;
  question_id: number;
  value: string | null;
  flagged: boolean;
};

export type PutSectionResponse = {
  id: Section['id'];
  name: Section['name'];
  package_id: Package['id'];
  time: number | null;
  time_sen: number | null;
  type: Section['type'];
};

export type PutSectionParams = {
  session_id: string;
  section_id: number;
};
