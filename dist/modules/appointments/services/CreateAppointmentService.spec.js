var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
describe('CreateAppointment', () => {
    it('should be able to create a new appointment', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
        const appointment = yield createAppointment.execute({
            date: new Date(),
            provider_id: '123456',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    }));
    // it('should not be able to create  two  appointments on the same time', () => {
    //   expect(1 + 2).toBe(3);
    // })
});
