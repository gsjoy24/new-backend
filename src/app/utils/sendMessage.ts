import axios from 'axios';
import config from '../config';

type TProps = {
	number?: string;
	message: string;
};

const sendMessage = async ({ number, message }: TProps) => {
	const { data } = await axios.post(config.sms_api, { number, message });
	return data;
};

export default sendMessage;
