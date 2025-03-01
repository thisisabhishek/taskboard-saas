/**
 * Server component
 */
import RegisterForm from "./form";

export default async function RegisterPage({searchParams}) {
 
	return (
		<>
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
						Create an account
					</h1>
					<RegisterForm />
				</div>
			</div>
		</>
	);
}
