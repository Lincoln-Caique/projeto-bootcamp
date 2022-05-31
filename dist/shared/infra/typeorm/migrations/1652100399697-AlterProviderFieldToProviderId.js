var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TableColumn, TableForeignKey } from "typeorm";
export default class AlterProviderFieldToProviderId1652100399697 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('appointments', 'provider');
            yield queryRunner.addColumn('appointments', new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }));
            yield queryRunner.createForeignKey('appointments', new TableForeignKey({
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
            yield queryRunner.dropColumn('appointments', 'provider_id');
            yield queryRunner.addColumn('appointments', new TableColumn({
                name: 'provider',
                type: 'varchar',
            }));
        });
    }
}
