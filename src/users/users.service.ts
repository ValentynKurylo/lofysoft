import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./models/user.model";
import {UserDTO} from "./models/userDTO";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {
    }


    async postUser(userDTO: UserDTO): Promise<any>{
        try {
            const user = await this.userRepository.create(userDTO)
            const return_user = {
                'id': user.id,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
                'role': user.role
            }
            return return_user
        } catch (e) {
            throw new HttpException('Bad Data', HttpStatus.BAD_REQUEST)
        }
    }

    async getUserByEmail(email: string): Promise<UserModel>{
         return  await this.userRepository.findOne({where: {email}})
    }

    async getAll(page: number = 1, limit: number = 10): Promise<object>{
        const offset = (page - 1) * limit;
        const res = await this.userRepository.findAndCountAll({ attributes: {exclude: ['password']}, offset, limit})
        return {
            'count': res.count,
            'data': res.rows
        }
    }

    async getById(id: number): Promise<UserModel>{
        try {
            return await this.userRepository.findByPk(id, {attributes: {exclude: ['password']}})
        } catch (e) {
            throw new HttpException('user with such id is not exist', HttpStatus.BAD_REQUEST)
        }
    }


}
