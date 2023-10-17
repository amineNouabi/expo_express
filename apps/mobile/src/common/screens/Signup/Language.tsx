import React, { useState } from "react";
import { ScrollView, Image, StyleSheet, I18nManager } from "react-native";

import { Button, RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

// import HeaderLayout from "../layouts/Header";

type Local = "en" | "fr" | "ar";

function Language() {
	const { i18n, t } = useTranslation();
	const [value, setValue] = useState(i18n.language);
	const navigation = useNavigation();

	const changeLanguage = (lng: Local) => {
		setValue(lng);
		i18n.changeLanguage(lng)
			.then(() => {
				I18nManager.forceRTL(i18n.language === "ar");
			})
			.catch(err => {
				console.log(err);
				console.log("something went wrong while applying RTL");
			});
	};

	return (
		<ScrollView contentContainerStyle={styles.background}>
			<Image style={styles.image} source={require("../../../../assets/images/language.png")} />
			<RadioButton.Group onValueChange={(newLocal: string) => changeLanguage(newLocal as Local)} value={value}>
				<RadioButton.Item label="English" value="en" />
				<RadioButton.Item label="Francais" value="fr" />
				<RadioButton.Item label="عربية" value="ar" />
			</RadioButton.Group>
			<Button
				style={styles.button}
				mode="contained"
				onPress={() =>
					navigation.navigate("Signup", {
						screen: "Role",
					})
				}>
				{t("Next")}
			</Button>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		backgroundColor: "transparent",
		display: "flex",
	},
	image: {
		width: 280,
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

export default Language;
