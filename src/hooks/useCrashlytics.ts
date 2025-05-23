import CrashlyticsService from '@api/crashlyticsService';
import {useCallback} from 'react';

export const useCrashlytics = () => {
  const log = useCallback(CrashlyticsService.log, []);
  const recordError = useCallback(CrashlyticsService.recordError, []);
  const setUser = useCallback(CrashlyticsService.setUser, []);
  const setAttribute = useCallback(CrashlyticsService.setAttribute, []);
  const crashApp = useCallback(CrashlyticsService.crashApp, []);

  return {
    log,
    recordError,
    setUser,
    setAttribute,
    crashApp,
  };
};
