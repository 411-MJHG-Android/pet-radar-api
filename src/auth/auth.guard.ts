import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Extraemos el encabezado de autorización
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("No se proporcionó el encabezado de autorización");
    }

    // Separamos "Bearer" y el token real
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException("Formato de token incorrecto (debe ser 'Bearer <token>')");
    }

    console.log("Token recibido en el Guard:", token); // <-- CLAVE PARA DEPURAR

    try {
      // Intentamos obtener el usuario
      const userId = await this.tokenService.getUserId(token);
      request.userId = userId;
      return true;
    } catch (error) {
      console.log("Error al verificar token:", (error as Error).message);
      throw new UnauthorizedException("El token no es valido o esta expirado");
    }
  }
}
