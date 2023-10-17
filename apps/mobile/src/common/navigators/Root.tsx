import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "./Auth";

import { useThemeContext } from "../hooks/useThemeContext";

const Stack = createStackNavigator();

function Root() {
	const { isDark } = useThemeContext();
	return (
		<NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name="Auth" component={Auth} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Root;
