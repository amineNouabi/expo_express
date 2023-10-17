import React, { createContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Role from "../screens/Signup/Role";
import Personal from "../screens/Signup/Personal";
import Location from "../screens/Signup/Location";

import type { SignupContextType } from "../types/SignupContext";

import { sendSmsCode, verifySmsCode } from "../auth";

type SignupStackParamList = {
	Role: undefined;
	Personal: undefined;
	Location: undefined;
};

const Stack = createStackNavigator<SignupStackParamList>();

export const SignupContext = createContext<SignupContextType>({} as SignupContextType);

const Signup = () => {
	const [data, setData] = React.useState<SignupContextType["data"]>({
		role: "" as SignupContextType["data"]["role"],
		name: "",
		phone: "",
	});
	const [code, setCode] = React.useState("");
	const [codeRequestId, setCodeRequestId] = React.useState("");
	const [verifiedPhone, setVerifiedPhone] = React.useState(false);

	const setRole = (role: SignupContextType["data"]["role"]) => {
		setData({ ...data, role });
	};

	const handleInputChange = (name: string, value: string) => {
		if (name === "phone" && codeRequestId) {
			setCodeRequestId("");
			setVerifiedPhone(false);
		}

		if (name === "code") {
			setCode(value);
		} else {
			setData({ ...data, [name]: value });
		}
	};

	async function requestSmsCode() {
		const response = await sendSmsCode(data.phone);
		console.log(response);
		if (response.ok && response.data) {
			setCodeRequestId(response.data.requestId);
		}
	}

	async function checkSmsCode() {
		const response = await verifySmsCode(codeRequestId, code);
		console.log(response);
	}

	const handlers = {
		setRole,
		handleInputChange,
		requestSmsCode,
		checkSmsCode,
	};

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="Role">{props => <Role {...props} data={data} handlers={handlers} />}</Stack.Screen>
			<Stack.Screen name="Personal">
				{props => (
					<Personal
						{...props}
						data={data}
						handlers={handlers}
						codeRequestId={codeRequestId}
						code={code}
						verifiedPhone={verifiedPhone}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen name="Location" component={Location} />
		</Stack.Navigator>
	);
};

export default Signup;
