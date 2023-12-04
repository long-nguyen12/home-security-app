import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import {
  CAMERA_PAGE,
  CANHAN_PAGE,
  CREATE_CAMERA_PAGE,
  DETAIL_CAMERA_PAGE,
  HISTORY_DETAIL_PAGE,
  HISTORY_PAGE,
  HOME_PAGE,
  MAIN,
  SCAN_AREA_PAGE,
  SCAN_PAGE,
  SETTING_PAGE,
  THONGBAO_CHITIET,
  THONGBAO_PAGE,
} from "../constants/routes";
import SettingsPage from "../screens/Account";
import HomePage from "../screens/Home";
import ThongbaoPage from "../screens/Thongbao";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import TabsUI from "../components/TabBar/TabUI";
import TaiKhoanPage from "../screens/Account/TaiKhoan";
import CameraPage from "../screens/Camera";
import CreateCameraPage from "../screens/Camera/components/NewCamera";
import DetailCameraPage from "../screens/Camera/components/DetailCamera";
import UploadScreen from "../screens/Home/components/Upload";
import DetectionAreaScreen from "../screens/Home/components/DetectionArea";
import ChiTietThongBao from "../screens/Thongbao/ChiTietThongBao";
import HistoryPage from "../screens/History";
import ChiTietLichSu from "../screens/History/ChiTietLichSu";
const tabs = [
  { route: HOME_PAGE, name: "Trang chủ" },
  { route: THONGBAO_PAGE, name: "Thông báo" },
  { route: SETTING_PAGE, name: "Tài khoản" },
];

function MainTabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        gestureEnabled: false,
      }}
      tabBar={(props) => <TabsUI {...{ tabs, ...props }} />}
      initialRouteName={HOME_PAGE}
    >
      <Tab.Screen
        name={HOME_PAGE}
        navigationKey={HOME_PAGE}
        component={HomePage}
      />
      <Tab.Screen
        name={THONGBAO_PAGE}
        navigationKey={THONGBAO_PAGE}
        component={ThongbaoPage}
      />
      <Tab.Screen
        name={SETTING_PAGE}
        navigationKey={SETTING_PAGE}
        component={SettingsPage}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name={MAIN}
        component={MainTabBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={CANHAN_PAGE} component={TaiKhoanPage} />
      <Stack.Screen name={SCAN_PAGE} component={UploadScreen} />
      <Stack.Screen name={SCAN_AREA_PAGE} component={DetectionAreaScreen} />
      <Stack.Screen name={THONGBAO_CHITIET} component={ChiTietThongBao} />
      <Stack.Screen name={HISTORY_PAGE} component={HistoryPage} />
      <Stack.Screen name={HISTORY_DETAIL_PAGE} component={ChiTietLichSu} />
    </Stack.Navigator>
  );
}
