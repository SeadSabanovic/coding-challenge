import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [PrismaModule, EventsModule],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
