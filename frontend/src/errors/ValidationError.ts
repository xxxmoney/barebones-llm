import type { ValidationDetail } from '../dtos/ValidationDetailDto.ts';

export class ValidationError extends Error {
  public detail: ValidationDetail;

  constructor(message: string, details: ValidationDetail) {
    super(message);
    this.name = 'ValidationError';
    this.detail = details;
  }
}
