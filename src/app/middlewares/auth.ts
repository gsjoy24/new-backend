import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: string[]) => {
	return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization;

		// checking if the token is missing
		if (!token) {
			throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
		}

		// checking if the given token is valid
		let decoded;

		try {
			decoded = jwt.verify(token, config.jwt_access_token) as JwtPayload;
		} catch (error) {
			throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
		}
		const { role, id } = decoded;

		// checking if the user is exist
		const user = await User.findOne({ id, role, isDeleted: false });

		if (!user) {
			throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user!');
		}
		if (requiredRoles.length && !requiredRoles.includes(user.role)) {
			throw new Error('You are not authorized!');
		}
		req.user = user;
		next();
	});
};

export default auth;
