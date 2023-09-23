import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDTO} from "../users/models/userDTO";
import {AuthDTO} from "./authDTO";
import {ValidationPipe} from "../pipes/validation.pipe";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "../users/models/user.model";
import {observable} from "rxjs";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary:'registration'})
    @ApiResponse({status: 201, type: UserModel})
    @UsePipes(ValidationPipe)
    @Post('/registration')
    async registration(@Body()body: UserDTO){
        return await this.authService.registration(body)
    }

    @ApiOperation({summary:'registration'})
    @ApiResponse({status: 200, type: Object})
    @Post('/login')
    async login(@Body() body: AuthDTO){
        return await this.authService.login(body)
    }

}
