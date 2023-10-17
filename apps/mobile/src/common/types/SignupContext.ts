export type SignupContextType = {
	data: {
		role: "customer" | "handyman";
		name: string;
		phone: string;
	};
	handlers: {
		setRole: (role: "customer" | "handyman") => void;
		handleInputChange: (name: string, value: string) => void;
		requestSmsCode: () => Promise<void>;
		checkSmsCode: () => Promise<void>;
	};
};

export default SignupContextType;
