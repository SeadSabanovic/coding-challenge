import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

const DEV_DELAY_MS = 800; // Simulated network delay in milliseconds

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class DevDelayInterceptor implements NestInterceptor {
  async intercept(_context: ExecutionContext, next: CallHandler) {
    // Only add delay in development
    if (process.env.NODE_ENV === 'production') {
      return next.handle();
    }

    // Add delay before processing
    await sleep(DEV_DELAY_MS);

    return next.handle();
  }
}
