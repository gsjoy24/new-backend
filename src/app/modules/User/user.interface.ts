/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type TUserRole = 'super_admin' | 'admin' | 'branch_manager';

export type TUser = {
	_id?: string;
	id: string;
	name: string;
	phone: string;
	password: string;
	role: TUserRole;
	isDeleted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
};
export type TLogin = {
	id: string;
	password: string;
};

export type TChangePassword = {
	oldPassword: string;
	newPassword: string;
};

export type TResetPassword = {
	token: string;
	newPassword: string;
};

export interface UserModel extends Model<TUser> {
	isUserExists(id: string): Promise<TUser | null>;
	isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
