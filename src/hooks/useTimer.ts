import {useEffect, useState, useRef, useCallback, DependencyList} from 'react';

type UseTimerProps = {
  remainingMinutes?: number;
  remainingSeconds?: number;
  remainingHours?: number;
  onComplete?: () => void;
  setInitialAfterFinish?: boolean;
  deps?: DependencyList;
};

const useTimer = (props: UseTimerProps) => {
  const {
    remainingMinutes = 0,
    remainingSeconds = 0,
    remainingHours = 0,
    onComplete = () => {},
    setInitialAfterFinish = true,
    deps = [],
  } = props;
  const [hours, setHours] = useState<number>(remainingHours);
  const [minutes, setMinutes] = useState<number>(remainingMinutes);
  const [seconds, setSeconds] = useState<number>(remainingSeconds);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    remainingHours && setHours(remainingHours);
    remainingMinutes && setMinutes(remainingMinutes);
    remainingSeconds && setSeconds(remainingSeconds);
  }, [remainingSeconds, remainingMinutes, remainingHours]);

  useEffect(() => {
    if (timerStarted) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      console.log('timer started', minutes, seconds, hours);
      timerRef.current = setInterval(() => {
        if (seconds == 0 && minutes == 0 && hours == 0) {
          stopTimer();
          return;
        }

        if (seconds > 0) {
          setSeconds(prev => prev - 1);
          return;
        }

        if (minutes > 0 && seconds === 0) {
          setMinutes(prev => prev - 1);
          setSeconds(59);
          return;
        }

        if (hours > 0 && minutes == 0 && seconds == 0) {
          setHours(prev => prev - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = null;
    };
  }, [timerStarted, minutes, seconds, hours]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
    setTimerStarted(false);
    onComplete();

    if (setInitialAfterFinish) {
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    }
  }, [setTimerStarted, setMinutes, setSeconds, ...deps]);

  const startTimer = useCallback(() => {
    setTimerStarted(true);
  }, [setTimerStarted]);

  return {
    minutes,
    seconds,
    hours,
    stopTimer,
    startTimer,
    timerStarted,
    setMinutes,
  };
};

export {useTimer};
