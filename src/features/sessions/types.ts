import type { Package } from '../packages/types';

export type Question = {
  id: number;
  type: 'MC' | 'DD';
  text: string | null;
  image_url: string | null;
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
  questions: Pick<Question, 'id' | 'status'>[];
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
  session_id: number;
  question_id: Question['id'];
  question: Question;
  value: string;
  flagged: 0 | 1;
};

export type SessionsState = {
  current_session: {
    id: string | null;
    section_id: string | null;
    started_at: Date | null;
    finished_at: Date | null;
    completed: number | null;
    package: Package | null;
    sections: Section[];
  };
};

export type StartSessionResponse = {
  id: string;
};

export type StartSessionParams = {
  user_id: number;
  package_id: number;
};

export type GetSessionResponse = SessionsState['current_session'];

export type GetSessionParams = {
  session_id: number;
};

export type GetQuestionResponse = QuestionResponse;

export type GetQuestionParams = {
  session_id: number;
  question_id: number;
};

export type PutQuestionResponse = QuestionResponse;

export type PutQuestionParams = {
  session_id: number;
  question_id: number;
  value: string | null;
  flagged: boolean;
};

export type GetSectionResponse = SessionsState['current_session'];

export type GetSectionParams = {
  session_id: number;
  section_id: number;
};
