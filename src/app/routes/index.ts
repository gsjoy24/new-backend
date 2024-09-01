import express from 'express';
import ProfileRoutes from '../modules/Profile/profile.routes';
import UserRoutes from '../modules/User/user.routes';

const router = express.Router();

const moduleRoutes = [
	{
		path: '/users',
		route: UserRoutes
	},
	{
		path: '/profiles',
		route: ProfileRoutes
	}
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
