import { format } from 'date-fns';

import { HOUR_HEIGHT } from '../../../constants';

interface HoursColumnProps {
  hours: number[];
  className?: string;
}

export function HoursColumn({ hours, className }: HoursColumnProps) {
  return (
    <div className={className}>
      {hours.map((hour, index) => (
        <div key={hour} className="relative border-r" style={{ height: `${HOUR_HEIGHT}px` }}>
          {index !== 0 && (
            <span className="absolute -top-2.5 right-2 text-xs text-muted-foreground">
              {format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
