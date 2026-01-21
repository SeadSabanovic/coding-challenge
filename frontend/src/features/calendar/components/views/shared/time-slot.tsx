import { HOUR_HEIGHT } from '../../../constants';

export function TimeSlot() {
  return (
    <div
      className="relative border-b border-dashed last:border-b-0"
      style={{ height: `${HOUR_HEIGHT}px` }}
    >
      {/* Clickable area */}
      <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-accent/50" />

      {/* Half hour line */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dotted border-muted-foreground/20" />
    </div>
  );
}

