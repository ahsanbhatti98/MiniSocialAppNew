import {useQuery} from '@tanstack/react-query';
import {HomeAPIS} from '../../api/home';
import {QueryKeys} from '../../constants';
import {PendingTaskResponseType} from '../../models';
import {useTypedSelector} from '../useTypedSelected';

export const useGetPendingTaskCounts = ({enabled}: {enabled?: boolean}) => {
  const userDetails = useTypedSelector(state => state.auth.user);

  return useQuery<PendingTaskResponseType>({
    enabled: enabled,
    queryKey: [QueryKeys.GET_PENDING_TASK_ID],
    queryFn: async () => {
      const {data} = await HomeAPIS.getPendingTask({
        id_user: userDetails?.id_user || 0,
      });
      const pendingTaskData = data;
      // console.log('pendingTaskData=>', pendingTaskData);
      if (!pendingTaskData) {
        return null;
      }

      return pendingTaskData;
    },
  });
};
