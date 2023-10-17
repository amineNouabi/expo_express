// import axios from "axios";
// import { StrategyOptionsWithRequest } from "passport-oauth2";

// import { OAuthStrategy } from "./oauth";
// import type { Profile } from "./oauth";

// import { env } from "../../../config/globals";

// export class FacebookStrategy extends OAuthStrategy {
// 	static readonly options: StrategyOptionsWithRequest = {
// 		authorizationURL: env.FACEBOOK.AUTH_URI,
// 		tokenURL: env.FACEBOOK.TOKEN_URI,
// 		clientID: env.FACEBOOK.CLIENT_ID,
// 		clientSecret: env.FACEBOOK.CLIENT_SECRET,
// 		callbackURL: env.FACEBOOK.REDIRECT_URI,
// 		passReqToCallback: true,
// 	};

// 	static readonly scope = ["email", "public_profile"];

// 	static readonly getProfileUrl = "https://graph.facebook.com/me?fields=id,name,email,picture,first_name,last_name";

// 	constructor() {
// 		super("facebook", FacebookStrategy.options, FacebookStrategy.scope);
// 	}

// 	userProfile = async function (accessToken, next): Promise<Profile> {
// 		var options = {
// 			url: `${FacebookStrategy.getProfileUrl}&access_token=${accessToken}`,
// 			method: "GET",
// 			headers: {
// 				Accept: "application/json",
// 				Authorization: "Bearer " + accessToken,
// 			},
// 		};
// 		try {
// 			const { data } = await axios.get(options.url, options);

// 			return {
// 				id: data.id,
// 				firstName: data.first_name,
// 				lastName: data.last_name,
// 				email: data.email,
// 				photo: data.picture.data.url,
// 			};
// 		} catch (err) {
// 			return next(new Error("Error Getting Profile from Facebook."), null);
// 		}
// 	};
// }
