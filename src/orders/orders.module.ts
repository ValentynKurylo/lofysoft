import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ProductModel} from "../products/models/product.model";
import {UserModel} from "../users/models/user.model";
import {JwtModule} from "@nestjs/jwt";
import {OrderModel} from "./models/order.model";
import {ProductsModule} from "../products/products.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([OrderModel, ProductModel, UserModel]),
    JwtModule,
    ProductsModule
  ],
})
export class OrdersModule {}
