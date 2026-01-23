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

export function EventDialog({ open, onOpenChange, event, defaultDate }: EventDialogProps) {
  const isEditing = !!event;

  const handleSuccess = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
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
          event={event}
          defaultDate={defaultDate}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
