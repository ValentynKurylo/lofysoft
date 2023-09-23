import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=>UsersModule),

    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY || '1111',
      signOptions:{
        expiresIn: "1h"
      }

    })
  ],
  exports: [
      AuthService,
      JwtModule
  ]
})
export class AuthModule {}
