import {Controller, Get, Param, Query} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "./models/user.model";

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary:'get all users'})
    @ApiResponse({status: 200, type: [UserModel]})
    @Get()
    async getAll(@Query()queries: any){
        return await this.userService.getAll(queries['page'], queries['limit'])
    }

    @ApiOperation({summary:'get user by id'})
    @ApiResponse({status: 200, type: UserModel})
    @Get('/:id')
    async GetById(@Param('id')id: number){
       return this.userService.getById(id)
    }

}
