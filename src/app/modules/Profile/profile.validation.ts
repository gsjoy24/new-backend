import { z } from 'zod';

const updateProfileSchema = z.object({
	body: z.object({
		Branch: z.string({
			required_error: 'Branch is required!'
		})
	})
});

const ProfileValidation = {
	updateProfileSchema
};

export default ProfileValidation;
