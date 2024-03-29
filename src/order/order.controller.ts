import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  @HttpCode(201)
  createOrder(@Body() CreateOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(CreateOrderDto)
  }
}
