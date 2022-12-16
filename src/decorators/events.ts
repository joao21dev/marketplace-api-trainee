import { AllExceptionsForMicroservice } from '../exceptions/microservices';
import { MessagePattern } from '@nestjs/microservices';
import {
  applyDecorators,
  UsePipes,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';

export const WatchEventPattern = (pattern: string) => {
  return applyDecorators(
    UseFilters(new AllExceptionsForMicroservice()),
    UsePipes(new ValidationPipe()),
    MessagePattern(pattern),
  );
};
