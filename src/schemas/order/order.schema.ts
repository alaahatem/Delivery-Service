// order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from '../address/address.schema';
import { Package, PackageSchema } from '../package/package.schema';
import { OrderStatus } from 'src/order/interfaces/enums';
@Schema()
export class Order {
  @Prop({ type: AddressSchema, required: true })
  pickup: Address;

  @Prop({ type: AddressSchema, required: true })
  dropoff: Address;

  @Prop({ type: [PackageSchema], required: true })
  packages: Package[];

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @Prop({ default: 0 })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
