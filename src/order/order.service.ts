import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order/order.schema';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  createOrder(createOrderDto: CreateOrderDto){
    const newOrder =  new this.orderModel(createOrderDto)
    return newOrder.save()

  }
  
}
