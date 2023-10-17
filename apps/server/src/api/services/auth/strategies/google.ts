// import { StrategyOptionsWithRequest } from "passport-oauth2";
// import { OAuthStrategy } from "./oauth";
// import axios from "axios";

// import { env } from "../../../config/globals";

// import type { Profile } from "./oauth";
// import AppError from "../../../config/apperror";

// // type Profile = {
// //   sub: string;
// //   email: string;
// //   email_verified: boolean;
// //   name: string;
// //   given_name: string;
// //   family_name: string;
// //   picture: string;
// // };

// export class GoogleStrategy extends OAuthStrategy {
// 	static readonly options: StrategyOptionsWithRequest = {
// 		authorizationURL: env.GOOGLE.AUTH_URI,
// 		tokenURL: env.GOOGLE.TOKEN_URI,
// 		clientID: env.GOOGLE.CLIENT_ID,
// 		clientSecret: env.GOOGLE.CLIENT_SECRET,
// 		callbackURL: env.GOOGLE.REDIRECT_URI,
// 		passReqToCallback: true,
// 	};

// 	static readonly scope = ["profile", "email"];

// 	static readonly getProfileUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

// 	constructor() {
// 		super("google", GoogleStrategy.options, GoogleStrategy.scope);
// 	}

// 	userProfile = async function (accessToken, next): Promise<Profile> {
// 		var options = {
// 			url: GoogleStrategy.getProfileUrl,
// 			method: "GET",
// 			headers: {
// 				Accept: "application/json",
// 				Authorization: "Bearer " + accessToken,
// 			},
// 		};

// 		try {
// 			const response = await axios.get(options.url, options);
// 			return {
// 				id: response.data.sub,
// 				email: response.data.email,
// 				firstName: response.data.given_name,
// 				lastName: response.data.family_name,
// 				photo: response.data.picture,
// 			};
// 		} catch (err) {
// 			return next(new Error("Error Getting Profile from Google."), null);
// 		}
// 	};
// }
