interface Course {
	[key: string]: any;
}

export interface TProfile {
	status?: string;
	uid: string;
	roll: string;
	Name?: string;
	FbName?: string;
	FbLink?: string;
	Email?: string;
	Phone?: string;
	Parent?: string;
	Institution?: string;
	HSC?: string;
	photo?: string;
	Address?: string;
	offline?: boolean;
	Branch?: string;
	Courses?: Course[];
	FCM?: string;
	created_at?: Date;
	updated_at?: Date;
}
