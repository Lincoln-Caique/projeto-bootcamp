var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseISO } from 'date-fns';
import 'reflect-metadata';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
export default class AppointmentsController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { provider_id, date } = req.body;
            const parsedDate = parseISO(date);
            const createAppointment = container.resolve(CreateAppointmentService);
            const appointment = yield createAppointment.execute({ date: parsedDate, provider_id });
            return res.json(appointment);
        });
    }
}
