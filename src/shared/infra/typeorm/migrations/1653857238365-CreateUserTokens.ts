// import { MigrationInterface, QueryRunner, Table } from "typeorm";

// export default class CreateUserTokens1653857238365 implements MigrationInterface {

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable({
//       new Table({
//       })
//       name: 'user_tokens',
//       columns: [
//         {
//           name: 'id',
//           type: 'uuid',
//           isPrimary: true,
//           generationStrategy: 'uuid',
//           default: 'uuid_generate_v4()',
//         },
//       ],
//       foreignKeys: []

//     })
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//   }

// }


import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUserTokens1589722702647
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
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
        foreignKeys: [
          {
            name: 'TokenUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_tokens");
  }
}
