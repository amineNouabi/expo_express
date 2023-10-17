import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";

function Header({ children, title }: HeaderProps): JSX.Element {
	// const navigation = useNavigation();

	// const goBack = () => navigation.goBack();

	return (
		<View>
			<Appbar.Header>
				{/* <Appbar.BackAction onPress={goBack} /> */}
				<Appbar.Content title={title} />
			</Appbar.Header>
			{children}
		</View>
	);
}

type HeaderProps = {
	children: React.ReactNode;
	title: string;
};

export default Header;
