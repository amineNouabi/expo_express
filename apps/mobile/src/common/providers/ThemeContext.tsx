import React, { createContext, useState } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import type { ThemeContextType } from "../types/ThemeContext";

import { env } from "../../config/globals";
import { themes } from "../../config/theme";

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

function ThemeProvider({ children }: ThemeContextProviderProps) {
	const colorScheme = useColorScheme();
	const [isDark, setIsDark] = useState(colorScheme === "dark");

	const toggleTheme = () => {
		setIsDark(!isDark);
	};

	if (env.MODE !== "production") {
		console.log("Color Scheme: ", colorScheme);
		console.log("Theme Context: Is Dark: ", isDark);
	}

	return (
		<ThemeContext.Provider
			value={{
				isDark,
				toggleTheme,
			}}>
			<PaperProvider theme={isDark ? themes.dark : themes.light}>{children}</PaperProvider>
		</ThemeContext.Provider>
	);
}

type ThemeContextProviderProps = {
	children: React.ReactNode;
};

export default ThemeProvider;
