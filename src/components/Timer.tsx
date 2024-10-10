import {useEffect, useState} from "react";

type TimerProps = {
  seconds: number;
  onChange: (value: number) => void;
  timerKey: string;
}

export const Timer = ({seconds, onChange, timerKey}: TimerProps) => {
  const [ticks, setTicks] = useState(seconds);

  useEffect(() => {
    setTicks(seconds)
  }, [seconds]);

  useEffect(() => {
    onChange(ticks)
  }, [onChange, ticks]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("TICK");
      setTicks(prevState => prevState - 1)
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [timerKey]);

  return (
    <div>{seconds}</div>
  )
};
