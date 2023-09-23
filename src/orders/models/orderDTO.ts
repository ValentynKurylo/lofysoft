import {IsNumber, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class OrderDTO{
    @ApiProperty({example: 1})
    @IsNumber({}, {message: 'must be number'})
    readonly productId: number

    @ApiProperty({example: 1})
    @IsNumber({}, {message: 'quantity must be number'})
    @Min(0, { message: 'quantity cannot be negative.' })
    readonly quantity: number
}
