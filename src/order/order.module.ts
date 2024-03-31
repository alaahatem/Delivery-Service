import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schemas/order/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderStateService } from './order-state.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      },
    ]),
  ],
  providers: [OrderService, OrderStateService],
  controllers: [OrderController]
})
export class OrderModule {}
