import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private jwsService: JwtService){}

    async generate(userId:number){
        const token = await this.jwsService.signAsync({ id: userId});
        return token;
    }

    async getUserId(token:string){
        try {
            const payload = await this.jwsService.verifyAsync(token);
            return payload.id;
        } catch(error) {
            // ESTO ES CLAVE: Imprimimos el error nativo de la librería JWT
            console.log("Error REAL de JWT:", (error as Error).message);
            throw new UnauthorizedException("El token no es valido o esta expirado");
        }
    }
}