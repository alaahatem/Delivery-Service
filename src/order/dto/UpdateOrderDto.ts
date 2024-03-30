// update-order.dto.ts

import { OrderStatus } from '../interfaces/enums';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
