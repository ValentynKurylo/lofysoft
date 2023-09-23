import {CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            if(authHeader){
                const bearer = authHeader.split(' ')[0]
                const token = authHeader.split(' ')[1]
                if (bearer !== 'Bearer' || !token) {
                    throw new UnauthorizedException({message: "You are not authorized", status: HttpStatus.UNAUTHORIZED})
                }
                const user = this.jwtService.decode(token)
                req.user = user
                return true
            }else {
                throw new UnauthorizedException({message: "You are not authorized", status: HttpStatus.UNAUTHORIZED})
            }

        }catch (e) {
            console.log(e)
            throw new UnauthorizedException({message: "You are not authorized", status: HttpStatus.UNAUTHORIZED})
        }
    }

}