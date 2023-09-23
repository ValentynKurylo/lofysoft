import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./models/user.model";
import {AuthModule} from "../auth/auth.module";
import {ProductModel} from "../products/models/product.model";
import {OrderModel} from "../orders/models/order.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([UserModel, ProductModel, OrderModel]),
    forwardRef(()=>AuthModule)
  ],
  exports: [
      UsersService
  ]
})
export class UsersModule {}
