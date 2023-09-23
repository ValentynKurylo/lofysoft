import {IsNumber, IsString, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ProductDTO{
    @ApiProperty({example: "product"})
    @IsString({message: 'Name must be string'})
    readonly name: string

    @ApiProperty({example: 50})
    @IsNumber({}, {message: 'Price must be number'})
    @Min(0, { message: 'Price cannot be negative.' })
    readonly price: number
}