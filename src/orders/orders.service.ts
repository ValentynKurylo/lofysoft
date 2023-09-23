import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {OrderModel} from "./models/order.model";
import {OrderDTO} from "./models/orderDTO";
import {UserModel} from "../users/models/user.model";
import {ProductModel} from "../products/models/product.model";
import {ProductsService} from "../products/products.service";

@Injectable()
export class OrdersService {
    constructor(@InjectModel(OrderModel) private orderRepository: typeof OrderModel, private productService: ProductsService) {
    }

    async postOrder(body: OrderDTO, userId: number): Promise<OrderModel> {
        try {
            const product = await this.productService.getProductById(body.productId)

            if (product.userId === userId) {
                throw new HttpException('You can not order your own product', HttpStatus.BAD_REQUEST)
            }
            return await this.orderRepository.create({...body, userId: userId})
        } catch (e) {
            console.log(e)
            throw new HttpException('Bad Data', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllOrders(page: number = 1, limit: number = 10): Promise<object>{
        const offset = (page - 1) * limit;
        const res = await this.orderRepository.findAndCountAll({ attributes: {exclude: ['productId', 'userId']}, include: [
                {model: ProductModel},
                {model: UserModel, attributes: {exclude: ['password']},},
            ], offset, limit})
        return {
            'count': res.count,
            'data': res.rows
        }
    }

    async getOrderById(id: number): Promise<OrderModel>{
        try {
            return await this.orderRepository.findOne({
                where: {id}, attributes: {exclude: ['productId', 'userId']}, include: [
                    {model: ProductModel},
                    {model: UserModel, attributes: {exclude: ['password']},},]
            })
        } catch (e) {
            throw new HttpException('Order with such id is not exist', HttpStatus.BAD_REQUEST)
        }
    }
}
