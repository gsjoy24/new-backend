import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
	port: process.env.PORT,
	database_url: process.env.DATABASE_URL as string,
	NODE_ENV: process.env.NODE_ENV,
	bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
	jwt_access_token: process.env.JWT_ACCESS_TOKEN as string,
	jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
	jwt_refresh_token: process.env.JWT_REFRESH_TOKEN as string,
	jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,

	super_admin_email: process.env.SUPER_ADMIN_EMAIL,
	super_admin_password: process.env.SUPER_ADMIN_PASSWORD,

	coupon_api: process.env.COUPON_API as string,
	sms_api: process.env.SMS_API as string
};
