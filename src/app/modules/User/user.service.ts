import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../../utils/auth';
import generateId from '../../utils/generateId';
import generatePassword from '../../utils/generatePassword';
import sendMessage from '../../utils/sendMessage';
import { TLogin, TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
	// check if user already exists
	const user = await User.findOne({ phone: payload.phone });
	if (user) {
		throw new AppError(httpStatus.CONFLICT, 'An user already exists with this phone number!');
	}

	const { ...userData } = payload;
	userData.password = generatePassword();
	userData.id = generateId(payload.role) as string;

	const message = `Your account has been created successfully. Your ID is ${userData.id} and password is ${userData.password}. Do not share your credentials with anyone.`;

	const res = await sendMessage({
		number: userData.phone,
		message
	});

	if (res?.response?.response_code !== 202) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Failed to send message!');
	}

	const result = await User.create(userData);
	return result;
};

const sendUserCredentials = async (id: string) => {
	const user = await User.findById(id);
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
	}

	const newPassword = generatePassword();
	const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_round));

	const result = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

	const message = `Your ID is ${user.id} and new password is ${newPassword}. Do not share your credentials with anyone.`;

	const res = await sendMessage({
		number: user.phone,
		message
	});

	if (res?.response?.response_code !== 202) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Failed to send message!');
	}

	return result;
};

const getUsers = async (role: string) => {
	// check if the the role is correct
	if (role && role !== 'admin' && role !== 'agent') {
		throw new AppError(httpStatus.BAD_REQUEST, 'Invalid role!');
	}
	const query = { isDeleted: false } as Record<string, any>;
	if (role) {
		query.role = role;
	}
	const users = await User.find(query).select('-password');
	// remove the super admin from the list
	const result = users.filter((user) => user.role !== 'super_admin');
	return result;
};

const loginUser = async (payload: TLogin) => {
	const { id, password } = payload;

	// check if the user is exist
	const user = await User.findOne({ id }).select('+password');
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'The user is not found!');
	}

	// check if the user is deleted
	if (user.isDeleted) {
		throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted!');
	}

	// check if the password is correct
	const isPasswordMatch = await User.isPasswordMatched(password, user?.password);

	if (!isPasswordMatch) {
		throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials!');
	}

	const jwtPayload = {
		id: user?.id,
		name: user?.name,
		phone: user?.phone,
		role: user?.role
	};

	const accessToken = createToken(jwtPayload, config.jwt_access_token, config.jwt_access_expires_in);

	const refreshToken = createToken(jwtPayload, config.jwt_refresh_token, config.jwt_refresh_expires_in);

	return {
		accessToken,
		refreshToken
	};
};

const deleteUser = async (id: string) => {
	const user = await User.findById(id);
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
	}

	const result = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
	return result;
};

const updateUser = async (id: string, payload: TUser) => {
	const user = await User.findById(id);
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
	}

	// remove password from payload if exists. We don't want to update password here.
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const { password, ...restData } = payload;

	const result = await User.findByIdAndUpdate(id, restData, { new: true });
	return result;
};

const UserServices = {
	createUser,
	sendUserCredentials,
	getUsers,
	loginUser,
	deleteUser,
	updateUser
};

export default UserServices;
