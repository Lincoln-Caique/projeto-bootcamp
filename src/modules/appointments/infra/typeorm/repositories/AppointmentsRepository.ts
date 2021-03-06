import { getRepository, Repository, Raw } from 'typeorm';


import Appointment from '../entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dto/IFindAllInDayFromProviderDTO';



class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }


  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2,'0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => `to_chart(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`),
      }
    });

    return appointments;
  }

  public async findAllInDayFromProvider({provider_id, day,month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2,'0');
    const parsedDay = String(day).padStart(2,'0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => `to_chart(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`),
      }
    });

    return appointments;
  }

  public async create({ date, provider_id , user_id}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date, user_id });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}


export default AppointmentsRepository;

