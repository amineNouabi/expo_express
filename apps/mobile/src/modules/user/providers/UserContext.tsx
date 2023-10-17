import React, { createContext, useState } from "react";

import type { UserContext } from "../types/UserContext";
import type { User } from "../types/User";

export const userContext = createContext<UserContext>({
	user: null,
	setUser: () => {},
});

function UserProvider({ children }: UserProviderProps): JSX.Element {
	const [user, setUser] = useState<User | null>(null);
	return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
}

type UserProviderProps = {
	children: JSX.Element;
};

export default UserProvider;
