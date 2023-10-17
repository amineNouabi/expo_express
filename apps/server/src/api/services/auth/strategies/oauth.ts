// import { bind } from "decko";
// import { Request, Response, NextFunction, Handler, request } from "express";
// import passport from "passport";
// import { Strategy, StrategyOptionsWithRequest } from "passport-oauth2";

// import { AuthenticationMethod, User, UserDoc } from "../../../api/components/types/User";
// import AppError from "../../../config/apperror";

// import { Strategy as BaseStrategy } from "./strategy";
// import logger from "../../../config/logger";
// import { env } from "../../../config/globals";
// import { JwtStrategy } from "./jwt";

// export type Profile = {
// 	id: string;
// 	email: string;
// 	firstName: string;
// 	lastName: string;
// 	photo: string;
// };

// /**
//  * OAuth Strategy Class for OAuth2 Strategy
//  *		*	Should be extended by child class and define userProfile function also provider options
//  */
// export abstract class OAuthStrategy extends BaseStrategy {
// 	protected readonly provider: string;
// 	protected readonly scope: string | string[];

// 	public constructor(
// 		provider: string,
// 		strategyOptions: StrategyOptionsWithRequest,
// 		strategyScope: string | string[] = "profile",
// 	) {
// 		super();
// 		this.scope = strategyScope;
// 		this.provider = provider;
// 		this._strategy = new Strategy(strategyOptions, this.verify);
// 	}

// 	/**
// 	 *  Get Profile from provider using accessToken
// 	 *		*	Should be implemented in child class
// 	 *
// 	 * @param accessToken Access Token from provider
// 	 * @param next Callback function to trigger any error and stop the process of authentication
// 	 * @returns Returns Profile from provider in our Profile type
// 	 */
// 	abstract userProfile(accessToken: string, next: (err: any) => void): Promise<Profile>;

// 	/**
// 	 *  Verify Callback function for OAuth2 Strategy To verify the user profile and create or update user in database
// 	 */
// 	@bind
// 	async verify(req, accessToken, refreshToken, profile, next) {
// 		/**
// 		 * Get Profile from provider.
// 		 */
// 		const PROFILE = await this.userProfile(accessToken, next);

// 		try {
// 			let user: UserDoc = req.user;

// 			/**
// 			 * Assemble Authentication method data.
// 			 */
// 			const method: AuthenticationMethod = {
// 				provider: this.provider,
// 				provider_id: PROFILE.id,
// 				email: PROFILE.email,
// 			};
// 			/**
// 			 * If req.user exists ==> User logged in so Linking this new authenticationMethod to user if doesn't have it already
// 			 */
// 			if (user) {
// 				return next(new AppError("Not Implemented yet.", 500));
// 			} else {
// 				/**
// 				 *   Lookup database if user exists with same authenticationMethod provider and id.
// 				 */
// 				user = await this.userRepo.read({
// 					authenticationMethods: {
// 						$elemMatch: {
// 							provider: this.provider,
// 							provider_id: PROFILE.id,
// 							isValidated: true,
// 						},
// 					},
// 				});

// 				/**
// 				 *  Validate Invalid methods in case of finding user and logged in with validated method.
// 				 */
// 				if (user) {
// 					if (user.validateMethodsDeltaTime()) await user.save({ validateBeforeSave: false });
// 					return next(null, user);
// 				}

// 				/**
// 				 * Look up User with authentication method that has same email.
// 				 */
// 				user = await this.userRepo.read({
// 					authenticationMethods: {
// 						$elemMatch: {
// 							email: PROFILE.email,
// 						},
// 					},
// 				});

// 				if (user) {
// 					await user.addAuthenticationMethod(method);
// 					const validMethod = user.getValidAuthenticationMethod();
// 					let errorMessage = "NoValidMethod";

// 					if (validMethod) errorMessage = `${validMethod.email}:${validMethod.provider}`;

// 					return next(null, null, { message: errorMessage });
// 				}

// 				user = await this.userRepo.readByEmail(PROFILE.email);

// 				if (user) {
// 					user.addAuthenticationMethod(method);
// 					return next(null, null, {
// 						message: "email:password",
// 					});
// 				}

// 				logger.info("Creating User...");

// 				user = await this.userRepo.create({
// 					email: PROFILE.email,
// 					firstName: PROFILE.firstName,
// 					lastName: PROFILE.lastName,
// 					username: `${PROFILE.firstName}_${PROFILE.lastName}`,
// 					photo: PROFILE.photo,
// 					password: undefined,
// 					authenticationMethods: [
// 						{
// 							...method,
// 							isValidated: true,
// 						},
// 					],
// 				} as User);

// 				logger.info("User Created!");
// 				return next(null, user);
// 			}
// 		} catch (err) {
// 			return next(err);
// 		}
// 	}

// 	/**
// 	 *  Authenticate user with OAuth2 Strategy and handles Redirections and operational errors.
// 	 */
// 	public isAuthorized(req: Request, res: Response, next: NextFunction): Handler | void {
// 		try {
// 			passport.authenticate(
// 				this.provider,
// 				{
// 					session: false,
// 					scope: this.scope,
// 					state: req.query.platform as string,
// 				},
// 				(err: any, user: UserDoc, info?: { message?: string }) => {
// 					if (err) {
// 						return next(err);
// 					}

// 					let redirectUrl = "";

// 					if (req.query.state === "influencer") redirectUrl = `${env.URL.WEB.INFLUENCER}/user/login`;

// 					if (info && info?.message) {
// 						return res.redirect(`${redirectUrl}?error=${encodeURIComponent(info.message)}`);
// 					}

// 					if (!user) {
// 						return next(new AppError("Unauthorized", 401));
// 					}

// 					const token: string = JwtStrategy.createToken(user.id);
// 					return res.redirect(`${redirectUrl}?token=${encodeURIComponent(token)}`);
// 				},
// 			)(req, res, next);
// 		} catch (err) {
// 			return next(err);
// 		}
// 	}
// }
