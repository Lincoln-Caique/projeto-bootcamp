import { container } from 'tsyringe';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/ UsersRepository';
container.registerSingleton('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton('UsersRepository', UsersRepository);
