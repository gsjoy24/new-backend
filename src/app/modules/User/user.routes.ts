import express from 'express';
import { UserRoles } from '../../constants';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import UserControllers from './user.controller';
import UserValidations from './user.validation';
const router = express.Router();

router.post(
	'/create',
	auth(UserRoles.SUPER_ADMIN),
	validateRequest(UserValidations.CreateUser),
	UserControllers.createUser
);

router.get('/', auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN), UserControllers.getUsers);

router.post('/send-credentials/:id', auth(UserRoles.SUPER_ADMIN), UserControllers.sendUserCredentials);

router.post('/login', validateRequest(UserValidations.LoginValidation), UserControllers.loginUser);

router.delete('/:id', auth(UserRoles.SUPER_ADMIN), UserControllers.deleteUser);

router.put('/update/:id', auth(UserRoles.SUPER_ADMIN), UserControllers.updateUser);

const UserRoutes = router;
export default UserRoutes;
