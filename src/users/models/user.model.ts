import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {RoleEnum} from "../../roles/role.enum";
import {ProductModel} from "../../products/models/product.model";
import {OrderModel} from "../../orders/models/order.model";
import {ApiProperty} from "@nestjs/swagger";


interface UserCreate{
    email: string,
    fistName: string,
    lastName: string,
    password: string,
    role: string,
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreate> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:"user@gmail.com"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: "1111"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: "User"})
    @Column({type: DataType.STRING, defaultValue: 'Null'})
    firstName: string

    @ApiProperty({example: "User"})
    @Column({type: DataType.STRING, defaultValue: 'Null'})
    lastName: string

    @ApiProperty({example: "customer"})
    @Column({type: DataType.STRING, defaultValue: String(RoleEnum.CUSTOMER)})
    role: RoleEnum

    @HasMany(()=>ProductModel)
    products: ProductModel[]

    @HasMany(()=>OrderModel)
    orders: OrderModel[]
}
