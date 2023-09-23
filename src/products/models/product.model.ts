import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {UserModel} from "../../users/models/user.model";
import {OrderModel} from "../../orders/models/order.model";
import {ApiProperty} from "@nestjs/swagger";

interface ProductCreate{
    name: string,
    price: number,
    userId: number
}

@Table({ tableName: 'products' })
export class ProductModel extends Model<ProductModel, ProductCreate> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "product"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: 50})
    @Column({type: DataType.FLOAT})
    price: number

    @ApiProperty({example: 3})
    @ForeignKey(()=>UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number

    @BelongsTo(()=>UserModel, {onDelete: 'CASCADE'})
    user: UserModel

    @HasMany(()=> OrderModel)
    orders: OrderModel[]
}
