import { User } from "./User";

export type UserContext = {
	user: User | null;
	setUser: (user: User | null) => void;
};
