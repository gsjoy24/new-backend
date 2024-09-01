import { model, Schema } from 'mongoose';
import { TProfile } from './profile.interface';

const profileSchema = new Schema<TProfile>(
	{
		status: {
			type: String,
			index: true
		},
		uid: {
			type: String,
			index: true,
			unique: true
		},
		roll: {
			type: String,
			index: true,
			unique: true,
			validate: /^[0-9]{6}$/
		},
		Name: {
			type: String,
			index: true
		},
		FbName: {
			type: String,
			index: true
		},
		FbLink: {
			type: String,
			index: true
		},
		Email: {
			type: String,
			index: true,
			validate:
				/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
		},
		Phone: {
			type: String,
			index: true,
			validate: /^(?:\+88|88)?(01[3-9]\d{8})$/
		},
		Parent: {
			type: String,
			index: true,
			validate: /^(?:\+88|88)?(01[3-9]\d{8})$/
		},
		Institution: {
			type: String,
			index: true
		},
		HSC: {
			type: String,
			index: true
		},
		photo: {
			type: String,
			index: true
		},
		Address: {
			type: String
		},
		offline: {
			type: Boolean,
			default: false,
			index: true
		},
		Branch: {
			type: String,
			index: true
		},
		Courses: [
			{
				type: Object,
				index: true
			}
		],
		FCM: {
			type: String
		},
		created_at: {
			type: Date,
			default: Date.now
		},
		updated_at: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
);

export const Profile = model<TProfile>('Profile', profileSchema);
