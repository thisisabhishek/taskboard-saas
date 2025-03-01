"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { TM_API_BASEURL } from './../../config.js'

const RegisterForm = ({claimId}) => {

	let baseURL = TM_API_BASEURL;
	console.log(`BaseURL for API is: ${baseURL}`)

	const router = useRouter();

    const signupSchema = object({
		email: string().required("Email is required"),
		password: string().required("Password is required"),
	});

	const formik = useFormik({
		initialValues:{ email: "", mobile: "", password: "" },
		validationSchema:signupSchema,
		onSubmit:(values, { setSubmitting }) => {
			
			axios
			.post(`${baseURL}/api/v1/business-user`, values)
			.then((res) => {
				console.log(res)
                if(res.status == 201) {
                    // move to mobile verify
					localStorage.setItem("registerEmail", values.email);
					router.push('/register/verify-email');
                }
                else {
                    toast.error(res.data.message);
                }
                setSubmitting(false);
			})
			.catch((err) => {
				// AxiosError is received here
				setSubmitting(false);
				// 403 is for general validation failures
				if(err.response.status === 403) {
					toast.error(err.response.data.message)
				}
				else {
					// unexpected error
					toast.error("Oops! some unexpected error occured.");
				}
				// need some common error handling Component
			})
		},
		isSubmitting: false,
	})

	return (
		<form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
			<div>
				<label
					htmlFor="email"
					className="block mb-2 text-sm font-medium text-gray-900 "
				>
					Your email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="name@company.com"
                    onChange={formik.handleChange}
				    onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
                {formik.touched.email && formik.errors.email ? (
                    <div className="mt-2 text-sm text-red-600">{formik.errors.email}</div>
                ) : null}
			</div>
			<div>
				<label
					htmlFor="password"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="••••••••"
					className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
				/>
                {formik.touched.password && formik.errors.password ? (
                    <div className="mt-2 text-sm text-red-600">{formik.errors.password}</div>
                ) : null}
			</div>
			<button
				type="submit"
				className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={formik.isSubmitting}
			>
				Create an account
			</button>
			<p className="text-sm font-light text-gray-500">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-medium text-primary-600 hover:underline"
				>
					Login here
				</Link>
			</p>
		</form>
	);
};

export default RegisterForm;
