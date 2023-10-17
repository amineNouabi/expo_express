import React from "react";

import UserProvider from "../../modules/user/providers/UserContext";
import ThemeProvider from "./ThemeContext";

import Root from "../navigators/Root";

function AppProvider(): JSX.Element {
	return (
		<ThemeProvider>
			<UserProvider>
				<Root />
			</UserProvider>
		</ThemeProvider>
	);
}

export default AppProvider;
