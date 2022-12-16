import { ApiOperation } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const ApiDescription = (description: string) => {
  return applyDecorators(ApiOperation({ summary: description }));
};
