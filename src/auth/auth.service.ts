import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserDTO} from "../users/models/userDTO";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcryptjs'
import {AuthDTO} from "./authDTO";

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private userService: UsersService) {
    }
    async registration(userDTO: UserDTO){
        const candidate = await this.userService.getUserByEmail(userDTO.email)
        if(candidate){
            throw  new  HttpException('User with such email already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDTO.password, 4)
        const new_user = await this.userService.postUser({...userDTO, password: hashPassword})
        return new_user
    }

    async login(authDTO: AuthDTO){
        const user = await this.userService.getUserByEmail(authDTO.email)
        if(!user){
            throw  new  HttpException('Wrong Email or Password', HttpStatus.BAD_REQUEST)
        }
        const isCorrectUser = await bcrypt.compare(authDTO.password, user.password)
        if(!isCorrectUser){
            throw  new  HttpException('Wrong Email or Password', HttpStatus.BAD_REQUEST)
        }
        const payload = {
            'id': user.id,
            'firstName': user.firstName,
            'role': user.role
        }
        return {
            token: this.jwtService.sign(payload),
            user: payload
        }
    }

}
