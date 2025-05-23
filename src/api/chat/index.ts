import {AxiosService} from '../https.service';
import Urls from './api.url';

const apiCall = AxiosService.getInstance();

const createSession = () => {
  return apiCall.post(Urls.createSession);
};

const getSessions = async ({cursor}: {cursor: string | null}) => {
  const cursorParam = cursor ? `cursor=${cursor}&` : '';
  const response = await apiCall.get(
    `${Urls.getSession}?${cursorParam}limit=10`,
  );

  const {
    data: {
      data: {sessions, next},
    },
  } = response;

  return {
    data: sessions,
    nextCursor: next !== 'None' ? next : null,
  };
};

const getChatHistory = async ({
  cursor,
  sessionId,
}: {
  cursor: string | null;
  sessionId: string;
}) => {
  const cursorParam = cursor ? `cursor=${cursor}&` : '';
  const response = await apiCall.get(
    `${Urls.getChatHistory}?${cursorParam}session_id=${sessionId}&limit=10`,
  );

  const {
    data: {
      data: {history, next},
    },
  } = response;

  return {
    data: history,
    nextCursor: next !== 'None' ? next : null,
  };
};

export const ChatApis = {
  createSession,
  getSessions,
  getChatHistory,
};
