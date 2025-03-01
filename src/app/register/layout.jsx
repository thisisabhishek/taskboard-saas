/**
 * Server component
 */
import { authOptions } from './../api/auth/auth.js'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterLayout({children}) {
    const session = await getServerSession(authOptions);
    if(session) {
		redirect("/dashboard");
	}
	return (
		<section>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-10 lg:py-0">
				<a
					href="/"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-100 ">
					TaskManager
				</a>
                {children}
			</div>
		</section>
	);
}
