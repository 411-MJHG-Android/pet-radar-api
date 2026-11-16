import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { EmailService } from './email/email.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { EmailModule } from './email/email.module';
import { CacheService } from './cache/cache.service';
import { CacheModule } from './cache/cache.module';


@Module({
  imports: [
    LostPetsModule, 
    AuthModule,
    //EmailService,
    EmailModule,
    UsersModule,
    //Para conectarse a a la BD
    TypeOrmModule.forRoot(dataSourceOptions),
    CacheModule

  ],
  controllers: [AppController],
  providers: [AppService, EmailService, CacheService],
})
export class AppModule {}
