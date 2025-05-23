import {AxiosService} from '@api/https.service.ts';
import {PendingTaskBodyType} from '../../models/request.types.ts';
import Urls from './api.url.ts';

const apiCall = AxiosService.getInstance();

const getPendingTask = (body: PendingTaskBodyType) => {
  return apiCall.post(Urls.pendingTask, body);
};
export const HomeAPIS = {
  getPendingTask,
};
