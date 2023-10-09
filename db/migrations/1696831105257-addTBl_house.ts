import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBlHouse1696831105257 implements MigrationInterface {
    name = 'AddTBlHouse1696831105257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "house" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "address" character varying NOT NULL, "whatsapp" character varying NOT NULL, "photos" text NOT NULL, "video" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, CONSTRAINT "PK_8c9220195fd0a289745855fe908" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "FK_f58981b869f14372c3e44920eb9" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "FK_f58981b869f14372c3e44920eb9"`);
        await queryRunner.query(`DROP TABLE "house"`);
    }

}
