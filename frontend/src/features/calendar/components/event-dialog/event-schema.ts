import { z } from 'zod';

export const eventFormSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    timezone: z.string().min(1, 'Timezone is required'),
    startDate: z.string().min(1, 'Start date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endDate: z.string().min(1, 'End date is required'),
    endTime: z.string().min(1, 'End time is required'),
    color: z.enum(['blue', 'green', 'red', 'yellow', 'purple', 'orange']),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(`${data.startDate}T${data.startTime}`);
      const end = new Date(`${data.endDate}T${data.endTime}`);
      return end > start;
    },
    {
      message: 'End time must be after start time',
      path: ['endTime'],
    }
  );

export type EventFormData = z.infer<typeof eventFormSchema>;
