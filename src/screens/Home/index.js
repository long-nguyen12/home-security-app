import { Text } from "@ui-kitten/components";
import React, { useEffect, useLayoutEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { tw } from "react-native-tailwindcss";
import { PRIMARY } from "../../constants/colors";
import { containerStyles } from "../../stylesContainer";

import GtHuongDanIcon from "../../assets/icons/gthuongdan.svg";
import GtUngDungIcon from "../../assets/icons/gtungdung.svg";

import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "../../constants";
import { HISTORY_PAGE, SCAN_PAGE } from "../../constants/routes";
import { isEmpty } from "../../epics-reducers/services/common";
import { userDeviceToken } from "../../epics-reducers/services/userServices";

export default function HomePage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    onInit();
  }, []);

  async function onInit() {
    const { data: token } = await Notifications.getExpoPushTokenAsync();
    const data = {
      device_token: token,
      user_id: user._id,
    };
    const res = await userDeviceToken(data);
  }

  function checkValidToken(loginRes) {
    if (!isEmpty(loginRes) && loginRes.token !== CONSTANTS.ERROR_AUTHEN) {
      return true;
    }
    return false;
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <ScrollView contentContainerStyle={[tw.p0, tw.pB16]}>
        <ImageBackground
          style={[
            tw.flexRow,
            tw.p4,
            tw.itemsCenter,
            {
              backgroundColor: PRIMARY,
              height: (Dimensions.get("window").height * 1) / 4,
              width: Dimensions.get("window").width,
            },
          ]}
          source={require("../../assets/header.jpg")}
          resizeMode="stretch"
        >
          <View style={[tw.flex1, tw.justifyEnd]}>
            <Text
              style={[
                tw.textXl,
                tw.uppercase,
                tw.textWhite,
                tw.selfEnd,
                { fontWeight: "bold", fontSize: 24 },
              ]}
            ></Text>
            <Text
              style={[
                tw.textWhite,
                tw.selfEnd,
                { fontWeight: "bold", fontSize: 22 },
              ]}
            ></Text>
          </View>
        </ImageBackground>
        <View style={[tw._m1, tw.p4]}>
          <Text category={"h6"} style={[tw.mB4, containerStyles.textStyle]}>
            Chức năng
          </Text>
          <View style={[tw.flexRow, tw.flexWrap, tw._m1]}>
            <View style={[tw.p1, tw.w1_2, { minHeight: 80 }]}>
              <TouchableOpacity
                style={[
                  tw.flex1,
                  tw.shadowXl,
                  tw.flexRow,
                  {
                    backgroundColor: "#fff",
                    alignItems: "center",
                    borderRadius: 16,
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate(SCAN_PAGE);
                }}
              >
                <GtUngDungIcon style={tw.mL2} />
                <Text style={[tw.p2, tw.flex1]}>Nhận dạng</Text>
              </TouchableOpacity>
            </View>
            <View style={[tw.p1, tw.w1_2, { minHeight: 80 }]}>
              <TouchableOpacity
                style={[
                  tw.flex1,
                  tw.shadowXl,
                  tw.flexRow,
                  {
                    backgroundColor: "#fff",
                    alignItems: "center",
                    borderRadius: 16,
                  },
                ]}
                onPress={() => {
                  props.navigation.navigate(HISTORY_PAGE);
                }}
              >
                <GtHuongDanIcon style={tw.mL2} />
                <Text style={[tw.p2, tw.flex1]}>Lịch sử</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
