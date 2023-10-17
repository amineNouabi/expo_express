import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import * as LocationExpo from "expo-location";
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "background-location-task";

type LocationTaskData = {
	locations: LocationExpo.LocationObject[];
};

function Location() {
	const { t } = useTranslation();

	const registerLocationTask = async () => {
		let { status } = await LocationExpo.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			console.log("Foreground permission not granted");
			return;
		}
		console.log("Foreground permission granted");

		const backgroundStatus = await LocationExpo.requestBackgroundPermissionsAsync();
		if (backgroundStatus.status !== "granted") {
			console.log("Background permission not granted");
			return;
		}
		console.log("Background permissiom granted");

		await LocationExpo.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
			accuracy: LocationExpo.Accuracy.High,
			timeInterval: 1000,
			distanceInterval: 5,
		});
	};

	return (
		<ScrollView contentContainerStyle={styles.background}>
			<Image style={styles.image} source={require("../../../../assets/images/location.png")} />
			<Text style={styles.title} variant="headlineSmall">
				{t("Activate the geolocation feature :")}
			</Text>
			<Button style={styles.button} mode="contained" onPress={registerLocationTask}>
				{t("Activate")}
			</Button>
		</ScrollView>
	);
}

TaskManager.defineTask<LocationTaskData>(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
	if (error) {
		console.log(error);
		return;
	}
	console.log("Received new locations ", locations);
});

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		backgroundColor: "transparent",
		display: "flex",
	},
	title: {
		marginLeft: 10,
	},
	image: {
		width: 340,
		height: 300,
		alignSelf: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	button: {
		alignSelf: "center",
		marginTop: "auto",
		marginBottom: 30,
	},
});

export default Location;
