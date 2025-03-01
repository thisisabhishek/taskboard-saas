"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { object, string } from "yup";
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const LoginForm = () => {

    const router = useRouter();

    const loginSchema = object({
		email: string().required("Email is required"),
		password: string().required("Password is required"),
	});

	const formik = useFormik({
		initialValues:{ email: "", password: "" },
		validationSchema:loginSchema,
		onSubmit: async (values, { setSubmitting }) => {
			// validate the user using next-auth
            const response = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false
            })

            /**
             * Handle error in response => response.error = CredentialsSignin
            */

			const session = await getSession();
			/**
			 * Session object
			 * {"user":{"name":"Abhishek Ahlawat","email":"abhishek@example.com","roleName":"Admin","roleId":"admin"},"expires":"2024-06-22T06:31:45.975Z"}
			 */

            if(!response?.error) {
				setSubmitting(false);
				if(session) {
					// For Namoza Admin users
					router.push("/dashboard");
					router.refresh();            	
				}
            }
			else {
				toast.error("Invalid Credentials provided!")
			}
		},
		isSubmitting: false,
	})

	return (
		<form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
            <div>
				<label
					htmlFor="email"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					Your email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="abhishek@studytonight.com"
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
				Login
			</button>
			<p className="text-sm font-light text-gray-500">
				Don&apos;t have an account?{" "}
				<Link
					href="/register"
					className="font-medium text-primary-600 hover:underline"
				>
					Register here
				</Link>
			</p>
		</form>
	);
};

export default LoginForm;
