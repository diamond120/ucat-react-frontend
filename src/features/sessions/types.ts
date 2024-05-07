export type SessionsState = {
  current_session_id: string | null;
};

export type StartSessionResponse = {
  id: string;
};

export type StartSessionParams = {
  user_id: number;
  package_id: number;
};
