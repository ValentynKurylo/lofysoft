import {CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../roles/role.decorator";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector, private jwtService: JwtService) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if(!roles){
            return true
        }
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            if(authHeader){
                const bearer = authHeader.split(' ')[0]
                const token = authHeader.split(' ')[1]
                if (bearer !== 'Bearer' || !token) {
                    throw new UnauthorizedException({message: "Forbidden resource", status: HttpStatus.FORBIDDEN})
                }
                const user = this.jwtService.verify(token)
                req.user = user
                return roles.includes(user.role)
            }else{
                throw new UnauthorizedException({message: "Forbidden resource", status: HttpStatus.FORBIDDEN})
            }
        } catch (e) {
            console.log(e)
            throw new UnauthorizedException({message: "Forbidden resource", status: HttpStatus.FORBIDDEN})
        }
    }

}