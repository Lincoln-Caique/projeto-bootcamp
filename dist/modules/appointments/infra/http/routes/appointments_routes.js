import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
appointmentsRouter.use(ensureAuthenticated);
// appointmentsRouter.get('/', async (req,res) => {
//   console.log(req.user);
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });
appointmentsRouter.post('/', appointmentsController.create);
export default appointmentsRouter;
