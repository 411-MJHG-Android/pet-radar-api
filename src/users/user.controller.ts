import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/createUsersDto';

@Controller('user') // Define la ruta base: /user (o /api/user si tienes un prefijo global)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Llama al método create de tu servicio pasándole el DTO que viene del Body (JSON)
    const userId = await this.usersService.create(createUserDto);
    
    // Devuelve una respuesta amigable con el ID que retorna tu servicio
    return {
      message: 'Usuario creado exitosamente',
      userId: userId
    };
  }
}