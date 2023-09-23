import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ProductModel} from "./models/product.model";
import {ProductDTO} from "./models/productDTO";
import {UserModel} from "../users/models/user.model";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(ProductModel) private productRepository: typeof ProductModel) {
    }

    async postProduct(body: ProductDTO, userId: number): Promise<ProductModel> {
        try {
            return await this.productRepository.create({...body, userId: userId})
        } catch (e) {
            console.log(e)
            throw new HttpException('Bad Data', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllProducts(page: number = 1, limit: number = 10): Promise<object>{
        const offset = (page - 1) * limit;
        const res = await this.productRepository.findAndCountAll({attributes: {exclude: ['userId']}, include: [
                {model: UserModel, attributes: {exclude: ['password']},},
            ], offset, limit})
        return {
            'count': res.count,
            'data': res.rows
        }
    }

    async getProductById(id: number): Promise<ProductModel>{
        try {
            return await this.productRepository.findOne({
                where: {id}, attributes: {exclude: ['userId']}, include: [
                    {model: UserModel, attributes: {exclude: ['password']},},]
            })
        } catch (e) {
            console.log(e)
            throw new HttpException('Product with such id is not exist', HttpStatus.BAD_REQUEST)
        }
    }


}