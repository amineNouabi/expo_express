module.exports = {
	root: true,
	extends: "@react-native",
	parserOptions: {
		requireConfigFile: false,
	},
	rules: {
		quotes: ["error", "double"],
		"prettier/prettier": [
			"error",
			{},
			{
				usePrettierrc: true,
			},
		],
	},
};
