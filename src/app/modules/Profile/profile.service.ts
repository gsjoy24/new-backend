import { TProfile } from './profile.interface';
import { Profile } from './profile.model';

const createProfile = async (payload: TProfile) => {
	const profile = await Profile.create(payload);
	return profile;
};

const updateProfile = async (id: string, payload: TProfile) => {
	const profile = await Profile.findByIdAndUpdate(id, payload, { new: true });
	return profile;
};

const getProfiles = async () => {
	const profile = await Profile.find();
	return profile;
};

const ProfileService = {
	createProfile,
	updateProfile,
	getProfiles
};

export default ProfileService;
