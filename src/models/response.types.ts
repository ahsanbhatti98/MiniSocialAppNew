export type LoginResponseType = {
  message: string;
  status_code: number;
  data: any;
};

export type PendingTaskResponseType = {
  data: {
    task_count: number;
  };
};

export type SessionListResponseType = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type ChatHistoryResponseType = {
  session_id: string;
  content: string;
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  role: string;
};
