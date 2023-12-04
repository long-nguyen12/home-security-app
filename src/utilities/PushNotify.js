import { Linking, Platform } from "react-native";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as IntentLauncher from "expo-intent-launcher";

let deviceToken = "";

/**
 * Get device push token
 */
export function getDeviceToken() {
  return deviceToken;
}

/**
 * Open Notification settings
 */
export function openSettings() {
  // On Android
  if (Platform.OS === "android") {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_APP_NOTIFICATION_SETTINGS,
      {
        extra: {
          "android.provider.extra.APP_PACKAGE":
            Constants.appOwnership === "expo"
              ? "host.exp.exponent"
              : Constants.manifest.android.package,
        },
      }
    );
  }

  // On iOS
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  }
}

/**
 * Create a Notification channel on Android 8.0+
 */
export function createChannel() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("notification", {
      name: "Thông báo",
      showBadge: true,
      vibrationPattern: [0, 250, 250, 250],
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

/**
 * Set number displayed in app icon's badge
 */
export async function setBadgeNumber(number) {
  return Notifications.setBadgeCountAsync(number);
}

export async function dismissAllNotifications() {
  return Notifications.dismissAllNotificationsAsync();
}

/**
 * Register to receive Push Notifications
 */
export async function registerPushNotify() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return "";
  }

  // Get the token that uniquely identifies this device
  if (Constants.isDevice) {
    const expoPushToken = await Notifications.getExpoPushTokenAsync();
    deviceToken = expoPushToken.data;
  }

  return deviceToken;
}
