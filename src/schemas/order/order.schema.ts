// order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from '../address/address.schema';
import { Package, PackageSchema } from '../package/package.schema';
@Schema()
export class Order {
  @Prop({ type: AddressSchema, required: true })
  pickup: Address;

  @Prop({ type: AddressSchema, required: true })
  dropoff: Address;

  @Prop({ type: [PackageSchema], required: true })
  packages: Package[];

  @Prop({
    enum: [
      'CREATED',
      'PICKED_UP',
      'DELIVERED',
      'RETURNING',
      'RETURNED',
      'CANCELLED',
    ],
    default: 'CREATED',
  })
  status: string;

  @Prop({ default: 0 })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
