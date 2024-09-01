import express from 'express';
import { UserRoles } from '../../constants';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ProfileControllers from './profile.controller';
import ProfileValidation from './profile.validation';

const router = express.Router();

router.post('/create', ProfileControllers.createProfile);

router.get('/', auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN), ProfileControllers.getProfiles);

router.put(
	'/:id',
	// auth(UserRoles.SUPER_ADMIN, UserRoles.BRANCH_MANAGER, UserRoles.ADMIN),
	validateRequest(ProfileValidation.updateProfileSchema),
	ProfileControllers.updateProfile
);

const ProfileRoutes = router;
export default ProfileRoutes;
