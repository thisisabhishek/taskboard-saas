import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { TB_API_BASEURL } from "@/config";

let baseURL = TB_API_BASEURL;

export const authOptions = {
	session: "jwt",
	pages: {
		signIn: "/login"
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				try {
					console.log(`API baseurl is: ` + baseURL)
					// You need to provide your own logic here that takes the credentials
					// submitted and returns either a object representing a user or value
					// that is false/null if the credentials are invalid.
					// e.g. return { id: 1, email: 'abhishek@example.com', role: 'Admin' }
					let uri = `${baseURL}/auth/login`
					const res = await axios.post(uri, 
						{ email: credentials.email, password: credentials.password }
					);

					// If no error and we have user data, return it
					console.log(res)
					// console.log(res.data.user.roles[0].role)
					if (res.data.user) {
						/*
							Object coming in response
							{
								id: 1,
								name: 'Abhishek Ahlawat',
								email: 'abhishek@example.com',
								emailVerfied: true,
								created: '2024-05-22T11:40:32.186Z',
								roles: [ { role: { name: 'Admin', identifier: 'admin' } } ]
								}

								We will set rolename and roleidentifier in token too
						*/
						return res.data.user;
					}
					else {
						// Return null if user data could not be retrieved
						return null;
					}
				}
				catch(err) {
					console.log(`error is ${JSON.stringify(err)}`)
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({token, user}) {
			if(user) {
				// console.log("User info in callback: " + JSON.stringify(user.userRoleRel[0].role.name))
				// console.log("User info in callback: " + JSON.stringify(user.accessToken))
				token.roleName = user?.roles[0].role.name;
				token.roleId = user?.roles[0].role.identifier;
				token.accessToken = user.accessToken;
				// console.log("Token info in callback: " + JSON.stringify(token))
			}
			return token;
		},
		async session({session, token}) {
			//console.log("Token info in callback: " + JSON.stringify(token))
			if(session?.user) {
				session.user.roleName = token.roleName;
				session.user.roleId = token.roleId;
				session.user.accessToken = token.accessToken
			}
			//console.log("Session info in callback: " + JSON.stringify(session))
			return session;
		}
	}
}