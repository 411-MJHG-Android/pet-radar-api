import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1788054608943 implements MigrationInterface {
    name = 'InitialMigration1788054608943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lost_pet" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "phone" character varying NOT NULL, "race" character varying NOT NULL, "age" integer NOT NULL, "color" character varying NOT NULL, "ownerName" character varying NOT NULL, CONSTRAINT "PK_e93154f3c554bba19e3515f1269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PENDING_EMAIL" ("id" SERIAL NOT NULL, "payload" character varying NOT NULL, "isPending" boolean NOT NULL, "subject" character varying NOT NULL, "to" character varying NOT NULL, CONSTRAINT "PK_01db8dd94ef7914d695da10f2c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PENDING_EMAIL"`);
        await queryRunner.query(`DROP TABLE "lost_pet"`);
    }

}
