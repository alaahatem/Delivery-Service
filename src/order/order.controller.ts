import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { UpdateOrderDto } from './dto/UpdateOrderDto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  @HttpCode(201)
  createOrder(@Body() CreateOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(CreateOrderDto);
  }
  @Put(':id')
  updateOrderStatus(
    @Param('id') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, updateOrderStatusDto); // Call the service method to update order status
  }

  @Get()
  searchByDropOffAddress(
    @Query('address') address: string,
    @Query('zipcode') zipCode: string,
  ) {
    return this.orderService.searchByDropOffAddress(address, zipCode);
  }
}
