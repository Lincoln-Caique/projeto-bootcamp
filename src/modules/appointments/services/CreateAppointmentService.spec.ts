import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;


describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

  })
  it('should be able to create a new appointment', async () => {

    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123456',
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');

  })

  it('should not be able to create  two  appointments on the same time', async () => {


    const appointmentDate = new Date(2022, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date:appointmentDate,
      user_id: '123456',
      provider_id: '123456',
    });

    await expect( createAppointment.execute({
      date:appointmentDate,
      user_id: '123456',
      provider_id: '123456',
    })).rejects.toBeInstanceOf(AppError);
    // expect(appointment.provider_id).toBe('123456');

  })
})
