import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ProfileServices from './profile.service';

const createProfile: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await ProfileServices.createProfile(req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Profile created successfully!',
		data: result
	});
});

const updateProfile: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await ProfileServices.updateProfile(req.params.id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Profile updated successfully!',
		data: result
	});
});

const getProfiles: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await ProfileServices.getProfiles();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Profiles fetched successfully!',
		data: result
	});
});

const ProfileControllers = {
	createProfile,
	updateProfile,
	getProfiles
};

export default ProfileControllers;
