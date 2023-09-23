import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UserDTO {
    @ApiProperty({example: "User"})
    @IsString({message: "User Name must be string"})
    readonly firstName: string

    @ApiProperty({example: "User"})
    @IsString({message: "User Name must be string"})
    readonly lastName: string

    @ApiProperty({example: "user@gamil.com"})
    @IsEmail({}, {message: "Wrong email"})
    readonly email: string

    @ApiProperty({example:"1111"})
    @IsString({message: "Password must be string"})
    @Length(4, 16,{ message: "Length of Password must be > 4 and < 16"})
    readonly password: string
}