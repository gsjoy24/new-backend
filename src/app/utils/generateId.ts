import { TUserRoles } from '../interface/user';

const generateId = (role: TUserRoles) => {
	const randomDigits = Math.floor(100 + Math.random() * 900);
	if (role === 'admin') {
		return randomDigits;
	} else if (role === 'branch_manager') {
		return `BM-${randomDigits}`;
	}
};

export default generateId;
