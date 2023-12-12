import { Button, Text } from "@ui-kitten/components";
import React, { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { PRIMARY } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutRoutine } from "../Login/saga/routines";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { tw } from "react-native-tailwindcss";
import { containerStyles } from "../../stylesContainer";
import { APP_AUTH, CANHAN_PAGE, LOGIN_PAGE } from "../../constants/routes";

export default function SettingsPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  function userLogout() {
    dispatch(userLogoutRoutine.trigger());
  }

  function preventBeforeLogin(routeName) {
    if (user._id) {
      props.navigation.navigate(routeName);
    } else {
      props.navigation.navigate(APP_AUTH, {
        screen: LOGIN_PAGE,
      });
    }
  }

  return (
    <SafeAreaView style={containerStyles.content}>
      <ScrollView contentContainerStyle={tw.pY4}>
        <TouchableOpacity
          style={[tw.flexRow, tw.p4, tw.itemsCenter]}
          // onPress={() => preventBeforeLogin(CANHAN_PAGE)}
        >
          <MaterialCommunityIcons
            name="account-circle"
            size={56}
            color={PRIMARY}
          />
          {user._id !== "" ? (
            <View style={[tw.flex1, tw.mX2]}>
              <Text category={"h5"} style={containerStyles.textStyle}>
                {user.full_name}
              </Text>
              <Text style={[tw.textBase, tw.textGray600]}>
                Thông tin cá nhân
              </Text>
            </View>
          ) : (
            <View style={[tw.flex1, tw.mX2]}>
              <Text category={"h5"}>Đăng nhập</Text>
              <Text style={[tw.textBase, tw.textGray600]}>
                Đăng nhập hệ thống
              </Text>
            </View>
          )}
          <MaterialCommunityIcons name="chevron-right" size={20} />
        </TouchableOpacity>
        {user._id ? (
          <Button style={[tw.mX2, { marginTop: 8 }]} onPress={userLogout}>
            <Text>Đăng xuất</Text>
          </Button>
        ) : (
          <View />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
