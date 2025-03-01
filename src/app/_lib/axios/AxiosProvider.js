import axios from "axios";
import { getServerSession } from 'next-auth';
import { authOptions } from './../../api/auth/auth.js'
import { TM_API_BASEURL } from "../../../config.js";

let baseURL = TM_API_BASEURL;

const AxiosInstance = () => {
	const defaultOptions = {
		baseURL,
	};

	const instance = axios.create(defaultOptions);

	instance.interceptors.request.use(async (request) => {
		const session = await getServerSession(authOptions);
		// console.log(`Session has: ${session.user.accessToken}`)
		if (session) {
			request.headers.Authorization = `Bearer ${session.user.accessToken}`;
		}
		return request;
	});

	return instance;
};

export default AxiosInstance();
