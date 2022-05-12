import { Router } from 'express';
import appointmentsRouter from './appointments_routes';
import usersRouter from './users.routs';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);



export default routes;

