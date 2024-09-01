const generatePassword = () =>
	'ags' +
	Array.from({ length: 5 }, () =>
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))
	).join('');

export default generatePassword;
