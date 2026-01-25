import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const existingCount = await this.prisma.event.count();
    if (existingCount > 0) {
      return;
    }

    const createDate = (daysOffset: number, hours: number, minutes: number = 0) => {
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    await this.prisma.event.createMany({
      data: [
        {
          title: 'Team Standup',
          startDate: createDate(0, 9, 0),
          endDate: createDate(0, 9, 30),
          timezone,
          color: 'blue',
          description: 'Daily team sync meeting',
        },
        {
          title: 'Project Review',
          startDate: createDate(0, 11, 0),
          endDate: createDate(0, 12, 30),
          timezone,
          color: 'green',
          description: 'Review Q1 project progress',
        },
        {
          title: 'Lunch with Client',
          startDate: createDate(0, 13, 0),
          endDate: createDate(0, 14, 0),
          timezone,
          color: 'yellow',
          description: null,
        },
        {
          title: 'Code Review',
          startDate: createDate(0, 15, 0),
          endDate: createDate(0, 16, 0),
          timezone,
          color: 'purple',
          description: null,
        },
        {
          title: 'Sprint Planning',
          startDate: createDate(1, 10, 0),
          endDate: createDate(1, 11, 30),
          timezone,
          color: 'blue',
          description: null,
        },
        {
          title: 'Design Review',
          startDate: createDate(1, 14, 0),
          endDate: createDate(1, 15, 0),
          timezone,
          color: 'orange',
          description: null,
        },
        {
          title: 'Client Meeting',
          startDate: createDate(2, 9, 0),
          endDate: createDate(2, 10, 30),
          timezone,
          color: 'red',
          description: null,
        },
        {
          title: 'Training Session',
          startDate: createDate(2, 13, 0),
          endDate: createDate(2, 15, 0),
          timezone,
          color: 'green',
          description: null,
        },
        {
          title: 'Interview',
          startDate: createDate(-1, 11, 0),
          endDate: createDate(-1, 12, 0),
          timezone,
          color: 'purple',
          description: null,
        },
        {
          title: 'Workshop',
          startDate: createDate(-3, 9, 0),
          endDate: createDate(-3, 12, 0),
          timezone,
          color: 'blue',
          description: null,
        },
      ],
    });
  }
}
