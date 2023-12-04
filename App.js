import "react-native-gesture-handler";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import * as Icon from "@expo/vector-icons";
import { default as theme } from "./src/utilities/theme.json";
import AppNavigator from "./src/navigation/AppNavigator";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import configureAppStore from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { extendFunction } from "./config/extendFunction";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useState, useEffect, useCallback } from "react";
import { default as mapping } from "./src/utilities/mapping.json";
import * as PushNotify from "./src/utilities/PushNotify";
SplashScreen.preventAutoHideAsync();

const { store, persistor } = configureAppStore();

extendFunction(store);
PushNotify.createChannel();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await _loadResourcesAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const _loadResourcesAsync = async () => {
    return Promise.all([
      await Font.loadAsync({
        SVN_Raleway_Bold: require("./assets/fonts/Roboto-Bold.ttf"),
        SVN_Raleway_Light: require("./assets/fonts/Roboto-Light.ttf"),
        SVN_Raleway_Regular: require("./assets/fonts/Roboto-Regular.ttf"),
        ...Icon.Ionicons.font,
        ...Icon.FontAwesome.font,
        ...Icon.FontAwesome5.font,
        ...Icon.MaterialCommunityIcons.font,
      }),
      await PushNotify.registerPushNotify(),
    ]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider
            {...eva}
            theme={{ ...eva.light, ...theme }}
            customMapping={mapping}
          >
            <AppNavigator />
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
