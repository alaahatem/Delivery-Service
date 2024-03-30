import { Body, Controller, HttpCode, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { UpdateOrderDto } from './dto/UpdateOrderDto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  @HttpCode(201)
  createOrder(@Body() CreateOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(CreateOrderDto)
  }
  @Put(':id') // Define the route handler for updating order status
  updateOrderStatus(@Param('id') orderId: string, @Body() updateOrderStatusDto: UpdateOrderDto) {
    return this.orderService.updateOrderStatus(orderId, updateOrderStatusDto); // Call the service method to update order status
  }
}
