import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order/order.schema';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { calculatePackagePrice } from './order.helper';
import { sum, pipe, map } from 'ramda';
import { PriceCalculationException } from 'src/shared/errors/PriceCalculationException';
import { OrderStatus } from './interfaces/enums';
import { OrderStateService } from './order-state.service';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly orderStateService: OrderStateService, // Inject OrderStateService
  ) {}

  createOrder = async (createOrderDto: CreateOrderDto) => {
    try {
      const { packages } = createOrderDto;
      const calculatedPrice = pipe(
        map(calculatePackagePrice), 
        sum, 
      )(packages);
      if (isNaN(calculatedPrice)) {
        throw new PriceCalculationException();
      }
      const newOrder = new this.orderModel({
        ...createOrderDto,
        totalPrice: calculatedPrice,
      });
      const { _id, status, totalPrice } = await newOrder.save();
      return { orderId: _id, status, totalPrice };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  };
  updateOrderStatus = async (orderId, updateOrderDto) => {
    try {
      const currentOrder = await this.orderModel.findById(orderId);

      if (!currentOrder) {
        throw new NotFoundException('Order not found');
      }

      if (
        !this.orderStateService.canTransitionTo(
          currentOrder.status,
          updateOrderDto.status,
        )
      ) {
        throw new BadRequestException('Invalid status transition');
      }

      if (
        [OrderStatus.CANCELLED, OrderStatus.DELIVERED].includes(
          currentOrder.status,
        )
      ) {
        throw new BadRequestException('Order status cannot be changed');
      }

      const updatedOrder = await this.orderModel.findByIdAndUpdate(
        orderId,
        { status: updateOrderDto.status },
        { new: true, select: '_id status' },
      );

      if (!updatedOrder) {
        throw new NotFoundException('Updated order not found');
      }

      return {
        orderId: updatedOrder.id,
        oldStatus: currentOrder.status,
        newStatus: updatedOrder.status,
      };
    } catch (error) {
      console.error(error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update order status');
    }
  };

  searchByDropOffAddress = async (address, zipCode) => {
    try {
      return this.orderModel
        .find({
          'dropoff.address': { $regex: new RegExp(address, 'i') },
          'dropoff.zipcode': zipCode,
        })
        .select('_id');
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to search orders');
    }
  };
}
