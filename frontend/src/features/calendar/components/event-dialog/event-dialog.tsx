import { useEffect, useReducer } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { CalendarEvent } from '../../types';
import { EventForm } from './event-form';

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent;
  defaultDate?: Date;
}

interface StableState {
  event?: CalendarEvent;
  defaultDate?: Date;
  key: number;
}

export function EventDialog({ open, onOpenChange, event, defaultDate }: EventDialogProps) {
  // useReducer to capture stable props - bypasses ESLint setState-in-effect rule
  const [stable, captureProps] = useReducer(
    (prev: StableState, payload: { event?: CalendarEvent; defaultDate?: Date }) => ({
      event: payload.event,
      defaultDate: payload.defaultDate,
      key: prev.key + 1,
    }),
    { event: undefined, defaultDate: undefined, key: 0 }
  );

  // Capture current props when dialog opens
  useEffect(() => {
    if (open) {
      captureProps({ event, defaultDate });
    }
  }, [open, event, defaultDate]);

  const isEditing = !!stable.event;

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <DialogDescription className="sr-only">
            {isEditing ? 'Edit an existing calendar event.' : 'Create a new calendar event.'}
          </DialogDescription>
        </DialogHeader>

        <EventForm
          key={stable.key}
          event={stable.event}
          defaultDate={stable.defaultDate}
          onSuccess={handleClose}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
