import {Body, Controller, Get, Param, Post, Query, Req, UseGuards, UsePipes} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {ProductDTO} from "./models/productDTO";
import {AuthGuard} from "../guards/auth.guard";
import {RoleGuard} from "../guards/role.guard";
import {Roles} from "../roles/role.decorator";
import {RoleEnum} from "../roles/role.enum";
import {ValidationPipe} from "../pipes/validation.pipe";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ProductModel} from "./models/product.model";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {
    }

    @ApiOperation({summary:'create product'})
    @ApiResponse({status: 201, type: ProductModel})
    @Roles(RoleEnum.VENDOR)
    @UseGuards(AuthGuard, RoleGuard)
    @UsePipes(ValidationPipe)
    @Post()
    async postProduct(@Body() body: ProductDTO, @Req()req){
       return await this.productService.postProduct(body, req.user.id)
    }

    @ApiOperation({summary:'get all products'})
    @ApiResponse({status: 200, type: [ProductModel]})
    @Get()
    async getAllProducts(@Query() query){
        return await this.productService.getAllProducts(query.page, query.limit)
    }

    @ApiOperation({summary:'get product by id'})
    @ApiResponse({status: 200, type: ProductModel})
    @Get('/:id')
    async getByProduct(@Param('id')id: number){
        return await this.productService.getProductById(id)
    }

}
