import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {UserModel} from "../../users/models/user.model";
import {ProductModel} from "../../products/models/product.model";
import {ApiProperty} from "@nestjs/swagger";

interface CreateOrder{
    productId: number,
    userId: number,
    quantity: number
}

@Table({ tableName: 'orders' })
export class OrderModel extends Model<OrderModel, CreateOrder> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, defaultValue: 1})
    quantity: number

    @ApiProperty({example: 1})
    @ForeignKey(()=> ProductModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    productId: number

    @BelongsTo(()=>ProductModel, {onDelete: 'SET NULL'})
    product: ProductModel

    @ApiProperty({example: 1})
    @ForeignKey(()=>UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number


    @BelongsTo(()=>UserModel, {onDelete: 'CASCADE'})
    user: UserModel

}
