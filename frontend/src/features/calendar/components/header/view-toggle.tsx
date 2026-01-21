import { CalendarDays, Columns3, Grid2x2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCalendarStore } from '../../store/calendar-store';

import type { CalendarView } from '../../types';

interface ViewOption {
  value: CalendarView;
  icon: React.ReactNode;
  label: string;
}

const VIEW_OPTIONS: ViewOption[] = [
  { value: 'day', icon: <CalendarDays strokeWidth={1.8} />, label: 'Day view' },
  { value: 'week', icon: <Columns3 strokeWidth={1.8} />, label: 'Week view' },
  { value: 'month', icon: <Grid2x2 strokeWidth={1.8} />, label: 'Month view' },
];

export function ViewToggle() {
  const { selectedView, setSelectedView } = useCalendarStore();

  return (
    <div className="inline-flex">
      {VIEW_OPTIONS.map((option, index) => (
        <Button
          key={option.value}
          aria-label={option.label}
          size="icon"
          variant={selectedView === option.value ? 'default' : 'outline'}
          className={getButtonClassName(index, VIEW_OPTIONS.length)}
          onClick={() => setSelectedView(option.value)}
        >
          {option.icon}
        </Button>
      ))}
    </div>
  );
}

function getButtonClassName(index: number, total: number): string {
  const base = '[&_svg]:size-5';

  if (index === 0) return `${base} rounded-r-none`;
  if (index === total - 1) return `${base} -ml-px rounded-l-none`;
  return `${base} -ml-px rounded-none`;
}

