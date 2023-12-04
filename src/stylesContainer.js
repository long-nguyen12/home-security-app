import { StyleSheet } from "react-native";
import { HELPER_LINK_TEXT, LABEL_TEXT, PRIMARY } from "./constants/colors";

export const THEMES = {
    BORDER: 8
}

export const containerStyles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    helper_text_link: {
        color: PRIMARY,
    },
    title_style: {
        color: HELPER_LINK_TEXT,
        alignSelf: "center",
    },
    label_style: {
        fontSize: 15,
        color: LABEL_TEXT,
    },
    icon_style: {
        width: 24,
        height: 24,
    },
    textStyle: {
        color: "#000000",
    },
    shadowBox: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 3,
    },
});
