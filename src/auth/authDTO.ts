import {ApiProperty} from "@nestjs/swagger";

export class AuthDTO {
    @ApiProperty({example: 'user@gmail.com'})
    readonly email: string

    @ApiProperty({example: '1111'})
    readonly password: string
}