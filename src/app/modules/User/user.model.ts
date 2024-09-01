import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
	{
		id: {
			type: String,
			required: [true, 'Id is required'],
			unique: true
		},
		name: {
			type: String,
			required: [true, 'Name is required']
		},
		phone: {
			type: String,
			required: [true, 'Phone is required'],
			unique: true
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: [6, 'Password can not be less than 6 characters'],
			select: false
		},
		role: {
			type: String,
			enum: ['super_admin', 'admin', 'branch_manager'],
			default: 'admin'
		},
		isDeleted: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

//! pre save middleware/hook || hashing password
userSchema.pre('save', async function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user = this;
	user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round));
	next();
});

//! checking if user is already exist!
userSchema.statics.isUserExists = async function (id) {
	const existingUser = await User.findById(id).select('+password');
	return existingUser;
};

userSchema.statics.isPasswordMatched = async function (plainPassword: string, hashedPassword: string) {
	return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
