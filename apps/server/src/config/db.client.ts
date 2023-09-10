import { PrismaClient } from "@prisma/client";
import UserExtension from "../api/components/user/model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalType<T> = Record<keyof T, any>;

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
	model: {
		user: UserExtension,
		$allModels: {
			filterInstance<Modal>(instance: Modal, keys: (keyof Modal)[]): Omit<Modal, keyof Modal> {
				const filteredEntries = Object.entries(instance as object).filter(
					([key]) => !keys.includes(key as keyof Modal),
				);
				const filteredObject = Object.fromEntries(filteredEntries) as ModalType<Modal>;
				return filteredObject;
			},
		},
	},
});

export const UserRepository = xprisma.user;

export default xprisma;
