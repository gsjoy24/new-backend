import config from '../config';
import { User } from '../modules/User/user.model';

const superAdmin = {
	id: 'super_admin',
	name: 'Super Admin',
	phone: '01722142333',
	password: config.super_admin_password,
	role: 'super_admin'
};

const seedSuperAdmin = async () => {
	const isSuperAdminExists = await User.findOne({
		phone: '01722142333'
	});
	if (!isSuperAdminExists) {
		await User.create(superAdmin);
	}
};

export default seedSuperAdmin;
