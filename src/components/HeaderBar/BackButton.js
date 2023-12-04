import React from "react";
import { TouchableOpacity } from "react-native";
import { tw } from "react-native-tailwindcss";
import BackIcon from "../../assets/icons/whitearrow.svg";

export default function BackButton({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw.mX4}>
            <BackIcon />
        </TouchableOpacity>
    );
}
