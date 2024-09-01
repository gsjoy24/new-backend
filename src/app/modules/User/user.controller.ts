import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserServices from './user.service';

const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await UserServices.createUser(req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `New ${req.body.role} created successfully!`,
		data: result
	});
});

const sendUserCredentials: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await UserServices.sendUserCredentials(req.params.id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Credentials sent successfully!',
		data: result
	});
});

const getUsers: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const role = req.query?.role;
	const result = await UserServices.getUsers(role as string);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users fetched successfully!',
		data: result
	});
});

const loginUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await UserServices.loginUser(req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Logged in successfully!',
		data: result
	});
});

const deleteUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await UserServices.deleteUser(req.params.id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User deleted successfully!',
		data: result
	});
});

const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await UserServices.updateUser(req.params.id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User updated successfully!',
		data: result
	});
});

const UserControllers = {
	createUser,
	getUsers,
	loginUser,
	deleteUser,
	updateUser,
	sendUserCredentials
};

export default UserControllers;
