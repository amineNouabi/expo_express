import { MODE } from "@env";

export const env = {
	development: {
		MODE: "development",
		baseURL: "http://localhost:3000",
	},
	production: {
		MODE: "production",
		baseURL: "https://api.example.com",
	},
	test: {
		MODE: "test",
		baseURL: "http://localhost:3000",
	},
}[MODE];

export const colors = {
	primary: "#F4E869",
	secondary: "#FAF2D3",
	tertiary: "#5CD2E6",
} as const;
