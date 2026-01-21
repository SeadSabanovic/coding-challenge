import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { HOUR_HEIGHT } from '../../../constants';

export function CurrentTimeLine() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentTimePositionPx = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    // Each hour = HOUR_HEIGHT pixels, each minute = HOUR_HEIGHT/60 pixels
    return hours * HOUR_HEIGHT + minutes * (HOUR_HEIGHT / 60);
  };

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-20 flex -translate-y-1/2 items-center"
      style={{ top: `${getCurrentTimePositionPx()}px` }}
    >
      <div className="size-2.5 -translate-x-1/2 rounded-full bg-destructive" />
      <div className="h-px flex-1 bg-destructive" />
      <span className="ml-2 rounded bg-destructive px-1 py-0.5 text-xs font-medium text-white">
        {format(currentTime, 'HH:mm')}
      </span>
    </div>
  );
}

