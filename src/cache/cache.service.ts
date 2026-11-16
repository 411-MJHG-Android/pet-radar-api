import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from 'src/config/envs';

//Orquestador de contenedores
@Injectable()
export class CacheService {

    private readonly redis = new Redis({
        host: envs.REDIS_HOST,
        port: envs.REDIS_PORT
    });

    async set(key: string, value: any, ttlSeconds = 60) {
        await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    }

    async get<T>(key: string): Promise<T | null> {
        const value = await this.redis.get(key);
        if (!value) return null;
        return JSON.parse(value) as T;
    }

    async delete(key: string) {
        await this.redis.del(key);
    }
}