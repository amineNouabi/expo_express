import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";

function Home() {
	const { colors } = useTheme();
	const { t } = useTranslation();

	const styles = StyleSheet.create({
		background: {
			flex: 1,
			backgroundColor: colors.onSecondary,
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<View style={styles.background}>
			<Button mode="contained" onPress={() => console.log("Pressed")}>
				<Text>{t("Press me")}</Text>
			</Button>
		</View>
	);
}

export default Home;
