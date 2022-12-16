import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor(msg?: string) {
    super(`Unauthorized : ${msg}`, HttpStatus.UNAUTHORIZED);
  }
}
