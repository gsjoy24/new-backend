import { z } from 'zod';

const CreateUser = z.object({
	body: z.object({
		name: z.string({
			required_error: 'Name is required!'
		}),
		phone: z
			.string({
				required_error: 'Phone is required!'
			})
			.refine((phone) => phone.length === 11, {
				message: 'Phone number must be 11 digits!'
			}),
		role: z.enum(['admin', 'agent'], {
			required_error: 'Role is required!',
			invalid_type_error: 'Role must be either admin or agent!'
		})
	})
});

const LoginValidation = z.object({
	body: z.object({
		id: z.string({
			required_error: 'Id is required!'
		}),
		password: z
			.string({
				required_error: 'Password is required!'
			})
			.min(6)
	})
});

const UserValidations = {
	CreateUser,
	LoginValidation
};

export default UserValidations;
