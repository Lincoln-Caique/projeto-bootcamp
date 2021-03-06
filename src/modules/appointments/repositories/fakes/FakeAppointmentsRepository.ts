import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns'


import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dto/IFindAllInDayFromProviderDTO';



class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointments =>{return(
        appointments.provider_id === provider_id &&
        getMonth(appointments.date) + 1 === month &&
        getYear(appointments.date) === year
      )}
    );
    return appointments;
  }

  public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointments =>{return(
        appointments.provider_id === provider_id &&
        getDate(appointments.date)  === day &&
        getMonth(appointments.date) + 1 === month &&
        getYear(appointments.date) === year
      )}
    );
    return appointments;
  }

  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {

    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });


    this.appointments.push(appointment);

    return appointment;
  }
}


export default FakeAppointmentsRepository;

