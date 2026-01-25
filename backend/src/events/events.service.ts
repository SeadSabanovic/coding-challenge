import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { startDate: 'asc' },
    });
  }

  async findByDateRange(from: Date, to: Date) {
    // Find events that overlap with the given date range
    // An event overlaps if: event.startDate < to AND event.endDate > from
    return this.prisma.event.findMany({
      where: {
        AND: [{ startDate: { lt: to } }, { endDate: { gt: from } }],
      },
      orderBy: { startDate: 'asc' },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async create(createEventDto: CreateEventDto) {
    const startDate = new Date(createEventDto.startDate);
    const endDate = new Date(createEventDto.endDate);

    // Validate end date is after start date
    if (endDate <= startDate) {
      throw new ConflictException('End date must be after start date');
    }

    // Check for overlapping events
    const hasOverlap = await this.checkOverlap(startDate, endDate);
    if (hasOverlap) {
      throw new ConflictException('This time slot overlaps with an existing event');
    }

    return this.prisma.event.create({
      data: {
        title: createEventDto.title,
        startDate,
        endDate,
        timezone: createEventDto.timezone,
        color: createEventDto.color,
        description: createEventDto.description,
      },
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    // Check if event exists
    await this.findOne(id);

    const startDate = updateEventDto.startDate ? new Date(updateEventDto.startDate) : undefined;
    const endDate = updateEventDto.endDate ? new Date(updateEventDto.endDate) : undefined;

    // If both dates are provided, validate and check overlap
    if (startDate && endDate) {
      if (endDate <= startDate) {
        throw new ConflictException('End date must be after start date');
      }

      const hasOverlap = await this.checkOverlap(startDate, endDate, id);
      if (hasOverlap) {
        throw new ConflictException('This time slot overlaps with an existing event');
      }
    }

    return this.prisma.event.update({
      where: { id },
      data: {
        ...(updateEventDto.title && { title: updateEventDto.title }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(updateEventDto.timezone && { timezone: updateEventDto.timezone }),
        ...(updateEventDto.color && { color: updateEventDto.color }),
        ...(updateEventDto.description !== undefined && {
          description: updateEventDto.description,
        }),
      },
    });
  }

  async remove(id: string) {
    // Check if event exists
    await this.findOne(id);

    return this.prisma.event.delete({ where: { id } });
  }

  private async checkOverlap(startDate: Date, endDate: Date, excludeId?: string): Promise<boolean> {
    const overlappingEvent = await this.prisma.event.findFirst({
      where: {
        AND: [
          { id: excludeId ? { not: excludeId } : undefined },
          { startDate: { lt: endDate } },
          { endDate: { gt: startDate } },
        ],
      },
    });

    return !!overlappingEvent;
  }
}
