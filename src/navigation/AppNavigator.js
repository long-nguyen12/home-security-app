import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import RootNavigator from "./RootNavigator";
import { navigationRef } from "../epics-reducers/navigationServices";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import { APP_AUTH, APP_LOADER, APP_MAIN } from "../constants/routes";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                {/* <Stack.Screen name={APP_LOADER} component={AppLoaderScreen} /> */}
                <Stack.Screen name={APP_AUTH} component={AuthNavigator} />
                <Stack.Screen name={APP_MAIN} component={RootNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
