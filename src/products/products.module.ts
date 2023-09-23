import {forwardRef, Module} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../users/models/user.model";
import {ProductModel} from "./models/product.model";
import {JwtModule} from "@nestjs/jwt";
import {OrderModel} from "../orders/models/order.model";


@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([ProductModel, UserModel, OrderModel]),
      JwtModule
  ],
  exports: [
      ProductsService
  ]
})
export class ProductsModule {}
