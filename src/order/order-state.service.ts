// order-state.service.ts
import { Injectable } from '@nestjs/common';
import { OrderStatus } from './interfaces/enums';

@Injectable()
export class OrderStateService {
  private readonly stateTransitions = new Map<OrderStatus, OrderStatus[]>([
    [OrderStatus.CREATED, [OrderStatus.PICKED_UP, OrderStatus.CANCELLED]],
    [OrderStatus.PICKED_UP, [OrderStatus.DELIVERED, OrderStatus.RETURNING]],
    [OrderStatus.RETURNING, [OrderStatus.RETURNED]],
  ]);

  canTransitionTo(currentState: OrderStatus, nextState: OrderStatus): boolean {
    const allowedTransitions = this.stateTransitions.get(currentState);
    return allowedTransitions ? allowedTransitions.includes(nextState) : false;
  }
}
