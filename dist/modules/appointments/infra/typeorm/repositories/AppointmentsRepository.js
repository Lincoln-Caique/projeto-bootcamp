var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Appointment from '../entities/Appointments';
import { getRepository } from 'typeorm';
class AppointmentsRepository {
    constructor() {
        this.ormRepository = getRepository(Appointment);
    }
    findByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAppointment = yield this.ormRepository.findOne({
                where: { date },
            });
            return findAppointment;
        });
    }
    create({ date, provider_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = this.ormRepository.create({ provider_id, date });
            yield this.ormRepository.save(appointment);
            return appointment;
        });
    }
}
export default AppointmentsRepository;
