import React from "react";

import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import SplashScreen from "./SplashScreen";
import * as ROUTES from "../../constants/routes";

export default function AppLoaderScreen(props) {
    const { navigation } = props;

    const token = useSelector((state) => state.auth.me);

    React.useEffect(() => {
        if (token) {
            navigation.replace(ROUTES.APP_MAIN);
        } else {
            navigation.replace(ROUTES.APP_AUTH);
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return async () => {
                await SplashScreen.hideAsync();
            };
        }, [])
    );

    return null;
}
