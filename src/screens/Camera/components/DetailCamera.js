import React, { useEffect, useLayoutEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { tw } from "react-native-tailwindcss";
import { PRIMARY } from "../../../constants/colors";
import { containerStyles } from "../../../stylesContainer";

import BackIcon from "../../../assets/icons/whitearrow.svg";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Orientation from "react-native-orientation";

export default function DetailCameraPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.camera_name ? props.camera_name : "Camera",
      cardShadowEnabled: false,
      headerStyle: {
        backgroundColor: PRIMARY,
      },
      headerTitleStyle: {
        color: "white",
      },
      headerTitleAlign: "center",
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={tw.mX4}
            onPress={() => props.navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
        );
      },
    });
  });
  const dispatch = useDispatch();
  let flatList = null;

  const user = useSelector((state) => state.auth);
  useEffect(() => {}, []);

  const calcVLCPlayerHeight = (windowWidth, aspetRatio) => {
    return windowWidth * aspetRatio;
  };

  return (
    <SafeAreaView style={[containerStyles.content]}>
    </SafeAreaView>
  );
}
