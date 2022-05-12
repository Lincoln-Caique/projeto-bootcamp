import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../service/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);




usersRouter.post('/', async (req,res) =>{

  const {name, email, password} = req.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
      name,
      email,
      password,
  })

  delete user.password;

  return res.json(user);


});

// usersRouter.patch('/avatar',ensureAuthenticated, upload.single('avatar') ,async (req,res)=> {
//   console.log(req.file);

//   return res.json({ok: true});

// },
// );


usersRouter.patch('/avatar',ensureAuthenticated, upload.single('avatar') ,async (req,res)=> {
    try{

      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      });

      delete user.password;

      return res.json(user);
    }catch (err){
      return res.status(400).json({error: err.message});
    }


  },
  );

export default usersRouter;
