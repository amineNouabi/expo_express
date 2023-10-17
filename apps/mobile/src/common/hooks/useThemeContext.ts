import { useContext } from "react";

import { ThemeContext } from "../providers/ThemeContext";

export function useThemeContext() {
	return useContext(ThemeContext);
}
