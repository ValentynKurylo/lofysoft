import {Body, Controller, Get, Param, Post, Query, Req, UseGuards, UsePipes} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {OrderDTO} from "./models/orderDTO";
import {AuthGuard} from "../guards/auth.guard";
import {ValidationPipe} from "../pipes/validation.pipe";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {OrderModel} from "./models/order.model";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {
    }

    @ApiOperation({summary:'create order'})
    @ApiResponse({status: 201, type: OrderModel})
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    async postOrder(@Body() body: OrderDTO, @Req() req){
        return await this.orderService.postOrder(body, req.user.id)
    }

    @ApiOperation({summary:'get all products'})
    @ApiResponse({status: 200, type: [OrderModel]})
    @Get()
    async getAllOrders(@Query() query){
        return await this.orderService.getAllOrders(query.page, query.limit)
    }

    @ApiOperation({summary:'get order by id'})
    @ApiResponse({status: 200, type: OrderModel})
    @Get('/:id')
    async getOrderById(@Param('id')id: number){
        return await this.orderService.getOrderById(id)
    }
}
