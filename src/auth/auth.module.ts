import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'; 
import { UsersModule } from 'src/users/user.module'; 
import { TokenService } from './token/token.service';
import { JwtModule } from '@nestjs/jwt';

//REFRESH TOKENS

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'sadaushdaushfoihoih21o1hoiahsihasif', 
      signOptions: {
        expiresIn: 86400
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService], 
  exports: [TokenService]
})
export class AuthModule {}