import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export default class CreateAppointments1651849212769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                      name: 'password',
                      type: 'varchar'
                    },
                    {
                      name: 'created_at',
                      type: 'timestamp',
                      default: 'now()',
                    },
                    {
                      name: 'updated_at',
                      type: 'timestamp',
                      default: 'now()',
                    },
                ],

            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        //Desfaz o que foi feito no up
        await queryRunner.dropTable('users');
    }

}

