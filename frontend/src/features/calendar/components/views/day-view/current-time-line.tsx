import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export function CurrentTimeLine() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentTimePosition = () => {
    const minutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const totalMinutes = 24 * 60;
    return (minutes / totalMinutes) * 100;
  };

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-20 flex items-center"
      style={{ top: `${getCurrentTimePosition()}%` }}
    >
      <div className="size-2.5 -translate-x-1/2 rounded-full bg-destructive" />
      <div className="h-px flex-1 bg-destructive" />
      <span className="ml-2 rounded bg-destructive px-1 py-0.5 text-xs font-medium text-white">
        {format(currentTime, 'HH:mm')}
      </span>
    </div>
  );
}
