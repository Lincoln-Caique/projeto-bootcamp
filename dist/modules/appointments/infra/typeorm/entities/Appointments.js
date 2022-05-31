var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinColumn } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
let Appointment = class Appointment {
};
__decorate([
    PrimaryGeneratedColumn('uuid')
], Appointment.prototype, "id", void 0);
__decorate([
    Column()
], Appointment.prototype, "provider_id", void 0);
__decorate([
    ManyToMany(() => User),
    JoinColumn({ name: 'provider_id' })
], Appointment.prototype, "provider", void 0);
__decorate([
    Column('timestamp with time zone')
], Appointment.prototype, "date", void 0);
__decorate([
    CreateDateColumn()
], Appointment.prototype, "created_at", void 0);
__decorate([
    CreateDateColumn()
], Appointment.prototype, "updated_at", void 0);
Appointment = __decorate([
    Entity('appointments')
], Appointment);
export default Appointment;
