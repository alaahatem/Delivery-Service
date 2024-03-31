import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { MONGODB_URL } from './config';
@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
