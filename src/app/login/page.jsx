/**
 * Server component
 */
import Image from "next/image";
import LoginForm from "./form";
import { authOptions } from './../api/auth/auth.js'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
	// console.log(`Session is: ${JSON.stringify(session)}`)
	if(session) {
		redirect("/dashboard");
	}
	return (
		<section>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-10 lg:py-0">
				<a
					href="/"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-100">
					TaskManager
				</a>
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
							Create an account
						</h1>
                        <LoginForm />
					</div>
				</div>
			</div>
		</section>
	);
}
