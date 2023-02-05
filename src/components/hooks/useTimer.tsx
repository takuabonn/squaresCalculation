import { useCallback, useState } from "react";

type TimerHook = [() => void, () => void, () => JSX.Element];
export const useTimer = (): TimerHook => {
  const [timer, setTimer] = useState(0);
  const [timeStopTriger, setTimeStopTriger] = useState<
    NodeJS.Timer | undefined
  >(undefined);

  const startTimeCount = useCallback(() => {
    const interval = setInterval(() => {
      setTimer((preTime) => preTime + 1);
    }, 1000);
    setTimeStopTriger(interval);
  }, []);

  const stopTimerCount = useCallback(() => {
    clearInterval(timeStopTriger);
  }, [timeStopTriger]);

  const renderTimer = () => <div>{timer}s</div>;

  return [startTimeCount, stopTimerCount, renderTimer];
};
