import { Router } from 'express';


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import UsersController from '../../controllers/UsersController';
import ProfileController from '../../controllers/ProfileController';


const profileRouter = Router()
const profileController = new ProfileController();
const userController = new UsersController();



profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter;
