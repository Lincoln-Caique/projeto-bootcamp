
import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '../dto/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '../dto/IFindAllInMonthFromProviderDTO';


export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data:IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
}


