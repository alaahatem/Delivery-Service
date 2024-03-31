import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PriceCalculationException extends BadRequestException {
  constructor() {
    super(`Error calculating total price`);
  }
}
