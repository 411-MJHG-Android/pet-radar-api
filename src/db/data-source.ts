import { DataSource, DataSourceOptions } from 'typeorm';
import { envs } from "src/config/envs";
import { LostPet } from "src/lost-pets/entities/lost-pet.entity";
import { PendingEmail } from 'src/email/entities/pending-email.entity';
import { User } from 'src/users/entities/user.entity';


//Conexiones a la BD
export const dataSourceOptions : DataSourceOptions = {
    host: envs.DB_HOST,
    type: 'postgres',
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    port: envs.DB_PORT,
    //Definir todas las tablas de la base de datos 
    entities: [LostPet, PendingEmail, User], 
    //Se deja en false para que no modifiques la base de datos mientras estas codificando
    synchronize: false,
    //Las modificaciones que se hacen de BD se hace en las migraciones para saber quien hizo cada cosa
    migrations: ['dist/db/migrations/[0-9]*-*.js']
}
//REGEX

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;