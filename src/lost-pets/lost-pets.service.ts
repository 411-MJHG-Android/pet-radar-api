import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LostPet } from './entities/lost-pet.entity';
import { CreateLostPetDto } from './dto/lost-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';

export const LOST_PET_ALL_CACHE_KEY = "lost-pets:all";
//Patron Repository 
@Injectable()
export class LostPetsService {
    constructor(
        @InjectRepository(LostPet)
        private lostPetRepository : Repository<LostPet>,
        private cacheService: CacheService
    ){

    }

    async getAllPets() : Promise<LostPet[]> {
    // 1. Agregamos el 'await' y unificamos la llave a "lost-pets:all"
    const cached = await this.cacheService.get<LostPet[]>(LOST_PET_ALL_CACHE_KEY);
    
    // Si la caché devuelve algo real, lo retornamos
    if(cached) return cached;

    // Si no hay caché, ahora sí buscará tus 1000 registros en la base de datos
    const lostPets = await this.lostPetRepository.find();
    
    // 2. Guardamos usando exactamente la misma llave
   await this.cacheService.set(LOST_PET_ALL_CACHE_KEY, lostPets);
    
    return lostPets;
}

    async createLostPet(dto:CreateLostPetDto) : Promise<LostPet>{
        const newLostPet = this.lostPetRepository.create({
            type: dto.type,
            name: dto.name,
            phone: dto.phone,
            race: dto.race,
            age: dto.age,
            color: dto.color,
            ownerName: dto.ownerName,
            location: {
                type: 'Point',
                coordinates:[dto.lon,dto.lat]
            }
        });
        //Hace el insert into en la base de datos de Postgres 
        const lostPet = await this.lostPetRepository.save(newLostPet);
        await this.cacheService.delete(LOST_PET_ALL_CACHE_KEY);
        //Devuelve el registro completo con el ID generado
        return lostPet;
    }
}
