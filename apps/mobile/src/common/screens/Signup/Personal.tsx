import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import type { SignupContextType } from "../../types";

function Personal({ data, handlers, code, codeRequestId }: PersonalProps) {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { handleInputChange } = handlers;

	const handleNext = () => {
		// if (!codeRequestId) {
		// 	requestSmsCode();
		// } else if (codeRequestId && code.length) {
		// 	checkSmsCode();
		// }
		navigation.navigate("Signup", {
			screen: "Location",
		});
	};

	return (
		<ScrollView contentContainerStyle={styles.background}>
			<Text style={styles.title} variant="headlineSmall">
				{t("Personal Informations :")}
			</Text>
			<View style={styles.inputs}>
				<TextInput
					error={!data.name}
					mode="outlined"
					label={t("Name")}
					value={data.name}
					onChangeText={value => handleInputChange("name", value)}
				/>
				<TextInput
					error={!data.phone}
					mode="outlined"
					inputMode="tel"
					label={t("Phone")}
					value={data.phone}
					onChangeText={value => handleInputChange("phone", value)}
				/>
				<TextInput
					error={!!codeRequestId && code.length !== 4}
					disabled={!codeRequestId}
					mode="outlined"
					inputMode="numeric"
					label={t("Code")}
					value={code}
					onChangeText={value => handleInputChange("code", value)}
				/>
			</View>
			<Button style={styles.button} mode="contained" onPress={handleNext}>
				{t("Next")}
			</Button>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		padding: 20,
	},
	title: {
		marginTop: 20,
		marginBottom: 10,
	},
	inputs: {
		marginBottom: 20,
		display: "flex",
		gap: 10,
	},
	button: {
		alignSelf: "center",
		marginTop: "auto",
		marginBottom: 30,
	},
});

type PersonalProps = SignupContextType & {
	code: string;
	codeRequestId: string;
	verifiedPhone: boolean;
	navigation: any;
};

export default Personal;
