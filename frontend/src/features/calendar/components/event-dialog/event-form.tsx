import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { AlertCircle, Calendar, Clock, Globe, Plus, Save, Trash2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { FieldError } from '@/components/ui/field-error';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Textarea } from '@/components/ui/textarea';

import { EVENT_COLORS, TIMEZONES, getDefaultTimezone } from '../../constants';
import { useCreateEvent, useUpdateEvent, useDeleteEvent, ApiError } from '../../hooks/use-events';
import type { CalendarEvent } from '../../types';
import { eventFormSchema, type EventFormData } from './event-schema';

interface EventFormProps {
  event?: CalendarEvent;
  defaultDate?: Date;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EventForm({ event, defaultDate, onSuccess, onCancel }: EventFormProps) {
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const isEditing = !!event;

  const handleDelete = () => {
    if (event) {
      deleteEvent.mutate(event.id, {
        onSuccess: () => onSuccess(),
      });
    }
  };

  // Get default values
  const now = defaultDate || new Date();
  const defaultTz = getDefaultTimezone();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event
      ? {
          title: event.title,
          timezone: event.timezone,
          // Convert UTC to event's original timezone for display
          startDate: format(toZonedTime(event.startDate, event.timezone), 'yyyy-MM-dd'),
          startTime: format(toZonedTime(event.startDate, event.timezone), 'HH:mm'),
          endDate: format(toZonedTime(event.endDate, event.timezone), 'yyyy-MM-dd'),
          endTime: format(toZonedTime(event.endDate, event.timezone), 'HH:mm'),
          color: event.color,
          description: event.description || '',
        }
      : {
          title: '',
          timezone: defaultTz,
          startDate: format(now, 'yyyy-MM-dd'),
          startTime: format(now, 'HH:mm'),
          endDate: format(now, 'yyyy-MM-dd'),
          endTime: format(new Date(now.getTime() + 30 * 60 * 1000), 'HH:mm'),
          color: 'blue',
          description: '',
        },
  });

  // Convert local time in timezone to UTC
  const toUTC = (date: string, time: string, tz: string): Date => {
    const localDateTimeString = `${date}T${time}:00`;
    return fromZonedTime(localDateTimeString, tz);
  };

  const onSubmit = async (data: EventFormData) => {
    const startDateTimeUTC = toUTC(data.startDate, data.startTime, data.timezone);
    const endDateTimeUTC = toUTC(data.endDate, data.endTime, data.timezone);

    const payload = {
      title: data.title.trim(),
      startDate: startDateTimeUTC.toISOString(),
      endDate: endDateTimeUTC.toISOString(),
      timezone: data.timezone,
      color: data.color,
      description: data.description?.trim() || undefined,
    };

    try {
      if (isEditing && event) {
        await updateEvent.mutateAsync({ id: event.id, payload });
      } else {
        await createEvent.mutateAsync(payload);
      }
      onSuccess();
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 409) {
        setError('root', { message: 'This time slot overlaps with an existing event' });
      } else {
        setError('root', { message: 'Failed to save event. Please try again.' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        {/* Title */}
        <div className="grid gap-2">
          <Label htmlFor="title" className="gap-1">
            Title <sup className="text-destructive">*</sup>
          </Label>
          <InputGroup>
            <InputGroupInput
              id="title"
              {...register('title')}
              placeholder="Event title"
              aria-invalid={!!errors.title}
            />
          </InputGroup>
          <FieldError message={errors.title?.message} />
        </div>

        {/* Timezone */}
        <div id="timezone-field" className="grid gap-2">
          <Label id="timezone-label">Timezone</Label>
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full" icon={<Globe />} aria-labelledby="timezone-label">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.timezone?.message} />
        </div>

        {/* Start Date/Time */}
        <div className="grid grid-cols-2 items-start gap-2">
          <div className="grid gap-2">
            <Label htmlFor="start-date">Start Date</Label>
            <InputGroup>
              <InputGroupInput
                id="start-date"
                type="date"
                {...register('startDate')}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-invalid={!!errors.startDate}
              />
              <InputGroupAddon>
                <Calendar />
              </InputGroupAddon>
            </InputGroup>
            <FieldError message={errors.startDate?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="start-time">Start Time</Label>
            <InputGroup>
              <InputGroupInput
                id="start-time"
                type="time"
                {...register('startTime')}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-invalid={!!errors.startTime}
              />
              <InputGroupAddon>
                <Clock />
              </InputGroupAddon>
            </InputGroup>
            <FieldError message={errors.startTime?.message} />
          </div>
        </div>

        {/* End Date/Time */}
        <div className="grid grid-cols-2 items-start gap-2">
          <div className="grid gap-2">
            <Label htmlFor="end-date">End Date</Label>
            <InputGroup>
              <InputGroupInput
                id="end-date"
                type="date"
                {...register('endDate')}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-invalid={!!errors.endDate}
              />
              <InputGroupAddon>
                <Calendar />
              </InputGroupAddon>
            </InputGroup>
            <FieldError message={errors.endDate?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end-time">End Time</Label>
            <InputGroup>
              <InputGroupInput
                id="end-time"
                type="time"
                {...register('endTime')}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-invalid={!!errors.endTime}
              />
              <InputGroupAddon>
                <Clock />
              </InputGroupAddon>
            </InputGroup>
            <FieldError message={errors.endTime?.message} />
          </div>
        </div>

        {/* Color */}
        <div id="color-field" className="grid gap-2">
          <Label id="color-label">Color</Label>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange as (value: string) => void}>
                <SelectTrigger className="w-full" aria-labelledby="color-label">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_COLORS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      <div className="flex items-center gap-2">
                        <div className={`size-3 rounded-full ${c.class}`} />
                        {c.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.color?.message} />
        </div>

        {/* Description */}
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Optional description"
            rows={3}
            className="resize-none"
          />
        </div>

        {/* Root error (overlap) */}
        {errors.root && (
          <div
            id="root-error-field"
            className="flex animate-in items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-2 text-xs text-destructive duration-200 fade-in-0 slide-in-from-top-1"
          >
            <AlertCircle size={16} />
            <FieldError message={errors.root?.message} />
          </div>
        )}
      </div>

      <DialogFooter>
        {isEditing ? (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteEvent.isPending}
          >
            <Trash2 />
            {deleteEvent.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={onCancel}>
            <X />
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || createEvent.isPending || updateEvent.isPending}
        >
          {isEditing ? (
            <>
              <Save />
              {updateEvent.isPending ? 'Saving...' : 'Save Changes'}
            </>
          ) : (
            <>
              <Plus />
              {createEvent.isPending ? 'Adding...' : 'Add Event'}
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
