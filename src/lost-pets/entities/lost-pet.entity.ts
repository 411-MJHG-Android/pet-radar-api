//No poner en plural las entidades
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";

//Creacion de la tabla
@Entity('lost_pet')
export class LostPet{
    //Para que el ID sea incrementable
    @PrimaryGeneratedColumn()
    id!: number

    //Creacion de las columnas
    @Column()
    type!: string;

    @Column()
    name!: string;

    //Gracias a postGis se trabaja diferente la locacion de LAN y LON
    @Column ({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    location!: Point

    @Column()
    phone!: string;

    @Column()
    race!: string;

    @Column()
    age!: number;

    @Column()
    color!: string;

    @Column()
    ownerName!: String

}