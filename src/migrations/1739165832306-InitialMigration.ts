import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1739165832306 implements MigrationInterface {
    name = 'InitialMigration1739165832306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`schedule\` varchar(100) NOT NULL, \`studentCapacity\` int NOT NULL, \`instructorCapacity\` int NOT NULL, \`startedDate\` int NOT NULL, \`departmentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`course\` ADD CONSTRAINT \`FK_62bd85cf9a50b5dff651935e028\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_62bd85cf9a50b5dff651935e028\``);
        await queryRunner.query(`DROP TABLE \`course\``);
        await queryRunner.query(`DROP TABLE \`department\``);
        await queryRunner.query(`DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
