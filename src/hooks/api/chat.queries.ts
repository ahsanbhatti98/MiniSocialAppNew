import {ChatApis} from '@src/api/chat';
import {NavigationService} from '@src/config';
import {useMutation} from '@tanstack/react-query';
import {usePaginatedCursorQuery} from '../usePaginatedQuery';
import {QueryKeys} from '@src/constants';
import {ChatHistoryResponseType} from '@src/models';
import {MessageType} from '@src/screens/chat/aiChat/chat.types';
// import {SessionListResponseType} from '@src/models';

export const useCreateSession = () => {
  return useMutation({
    mutationFn: ChatApis.createSession,
    onSuccess: async (response: any) => {
      const serverResponse = response?.data;
      console.log('response00<<', serverResponse);
      NavigationService.navigate('App', {
        screen: 'Chat',
        params: {
          sessionId: serverResponse?.data?.id,
        },
      });
    },
    onError: (error: any) => {
      console.log(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.response?.data?.msg ||
          error?.response?.error ||
          'Something went wrong. Please try again later.',
      );
    },
  });
};

export const useChatSessions = ({enabled}: {enabled?: boolean}) => {
  return usePaginatedCursorQuery({
    enabled: enabled,
    queryKey: [QueryKeys.GET_CHAT_SESSION],
    queryFn: ChatApis.getSessions,
  });
};

export const useChatHistory = ({
  sessionId,
  enabled,
}: {
  sessionId: string;
  enabled?: boolean;
}) => {
  return usePaginatedCursorQuery({
    enabled: enabled,
    queryKey: [QueryKeys.GET_CHAT_HISTORY, sessionId],

    queryFn: async ({cursor}) => {
      const response = await ChatApis.getChatHistory({
        cursor: cursor,
        sessionId,
      });
      console.log('cursor->>>>>>>', cursor);
      // console.log('response->>>>>>>', response);

      const mapHistoryToMessages = (
        history: ChatHistoryResponseType[],
      ): MessageType[] => {
        return history.map(msg => ({
          _id: msg.id,
          text: msg.content,
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.role === 'user' ? 1 : 2,
            name: msg.role === 'user' ? 'You' : 'AI',
          },
        }));
      };

      const historyData = response.data;

      const mappedHistory = mapHistoryToMessages(historyData);

      return {
        data: mappedHistory,
        nextCursor: response.nextCursor,
      };
    },
  });
};
