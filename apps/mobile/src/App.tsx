import "react-native-gesture-handler";
import React from "react";
import AppProvider from "./common/providers/App";

import { env } from "./config/globals";

import "./localization/i18n";

if (env.MODE !== "production") {
	console.log("App Environment: ");
	console.log(env);
}

function App(): JSX.Element {
	return <AppProvider />;
}

export default App;
