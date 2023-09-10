import { hash, compare } from "bcryptjs";

export default {
	async hashPassword(plainPassword: string): Promise<string> {
		return await hash(plainPassword, 12);
	},
	async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
		return await compare(plainPassword, hashedPassword);
	},
};
