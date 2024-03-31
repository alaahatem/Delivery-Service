import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { MONGODB_URL } from './config';
@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
