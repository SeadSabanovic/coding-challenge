import { z } from 'zod';
import { fromZonedTime } from 'date-fns-tz';

export const eventFormSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    timezone: z.string().min(1, 'Timezone is required'),
    startDate: z.string().min(1, 'Start date is required'),
    startTime: z
      .string()
      .min(1, 'Start time is required')
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time'),
    endDate: z.string().min(1, 'End date is required'),
    endTime: z
      .string()
      .min(1, 'End time is required')
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time'),
    color: z.enum(['blue', 'green', 'red', 'yellow', 'purple', 'orange']),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.endDate !== data.startDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date must match start date',
        path: ['endDate'],
      });
      return;
    }

    const start = fromZonedTime(`${data.startDate}T${data.startTime}:00`, data.timezone);
    const end = fromZonedTime(`${data.endDate}T${data.endTime}:00`, data.timezone);

    if (!(end > start)) {
      ctx.addIssue({
        code: 'custom',
        message: 'End time must be after start time',
        path: ['endTime'],
      });
      return;
    }

    const durationMs = end.getTime() - start.getTime();
    const minDurationMs = 15 * 60 * 1000;

    if (durationMs < minDurationMs) {
      ctx.addIssue({
        code: 'custom',
        message: 'Event must be at least 15 minutes',
        path: ['endTime'],
      });
    }
  });

export type EventFormData = z.infer<typeof eventFormSchema>;
