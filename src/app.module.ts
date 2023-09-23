import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import {UserModel} from "./users/models/user.model";
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import {ProductModel} from "./products/models/product.model";
import { OrdersModule } from './orders/orders.module';
import {OrderModel} from "./orders/models/order.model";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [UserModel, ProductModel, OrderModel],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ]
})
export class AppModule {}
