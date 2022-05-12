import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1651867701804 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: 'appointments',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'provider',
                    type: 'varchar',
                },
                {
                    name: 'date',
                    type: 'timestamp with time zone',
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
            ]

        })
    );
}

public async down(queryRunner: QueryRunner): Promise<void> {

    //Desfaz o que foi feito no up
    await queryRunner.dropTable('appointments');
}


}


