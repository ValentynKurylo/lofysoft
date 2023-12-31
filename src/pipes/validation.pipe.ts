import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "./validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate(obj)
        if(errors.length){
            let message = errors.map(e => {
                return `${e.property} - ${Object.values(e.constraints).join(', ')}`
            })
            throw new ValidationException(message)
        }
        return obj
    }
}