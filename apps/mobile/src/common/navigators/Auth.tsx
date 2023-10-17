import React from "react";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";

import Language from "../screens/Signup/Language";

import Signup from "./Signup";

type AuthStackParamList = {
	Language: undefined;
	Signup: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function Auth() {
	const { t } = useTranslation();
	return (
		<Stack.Navigator
			initialRouteName="Language"
			screenOptions={{
				headerShown: true,
				animationEnabled: true,
			}}>
			<Stack.Screen
				options={{
					title: t("Language"),
				}}
				name="Language"
				component={Language}
			/>
			<Stack.Screen
				options={{
					title: t("Signup"),
				}}
				name="Signup"
				component={Signup}
			/>
		</Stack.Navigator>
	);
}

export default Auth;
