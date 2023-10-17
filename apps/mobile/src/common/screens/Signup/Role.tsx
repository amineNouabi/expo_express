import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useNavigation } from "@react-navigation/native";
// import RoleButton from "../components/RoleButton";
import { Button, RadioButton } from "react-native-paper";

import type { SignupContextType } from "../../types";

function Role({ data, handlers }: RoleProps) {
	const navigation = useNavigation();
	const { t } = useTranslation();
	const { setRole } = handlers;
	return (
		<View style={styles.background}>
			<Image style={styles.image} source={require("../../../../assets/images/role.png")} />
			<RadioButton.Group
				onValueChange={(role: string) => setRole(role as SignupContextType["data"]["role"])}
				value={data.role}>
				<RadioButton.Item label={t("Customer")} value="customer" />
				<RadioButton.Item label={t("Handyman")} value="handyman" />
			</RadioButton.Group>
			<Button
				style={styles.button}
				disabled={!data.role}
				mode="contained"
				onPress={() => navigation.navigate("Personal")}>
				{t("Next")}
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		display: "flex",
	},
	image: {
		width: 290,
		height: 200,
		alignSelf: "center",
		marginTop: 50,
		marginBottom: 50,
	},
	button: {
		alignSelf: "center",
		marginTop: "auto",
		marginBottom: 30,
	},
});

type RoleProps = SignupContextType;

export default Role;
