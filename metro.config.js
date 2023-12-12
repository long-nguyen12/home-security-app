const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts.push("svg");
config.resolver.sourceExts.push("cjs");
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

module.exports = config;