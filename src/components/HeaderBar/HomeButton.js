import React from "react";
import { TouchableOpacity } from "react-native";
import { tw } from "react-native-tailwindcss";
import HomeIcon from "../../assets/menu_ico/homeon.svg";

import { HOME_PAGE, MAIN } from "../../constants/routes";

export default function BackButton({ navigation }) {
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate(MAIN, {
                    screen: HOME_PAGE,
                })
            }
            style={tw.mX4}
        >
            <HomeIcon />
        </TouchableOpacity>
    );
}
