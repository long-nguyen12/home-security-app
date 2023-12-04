import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { PRIMARY } from "../../constants/colors";
import { containerStyles } from "../../stylesContainer";
import { Text } from "@ui-kitten/components";

import BackIcon from "../../assets/icons/whitearrow.svg";

import jwtDecode from "jwt-decode";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { API, COMMON_APP, CONSTANTS } from "../../constants";
import { isEmpty, showToast } from "../../epics-reducers/services/common";
import { userLogoutRoutine } from "../Login/saga/routines";
import LoadingService from "../../components/Loading/LoadingService";
import { getAllCamera } from "../../epics-reducers/services/cameraServices";
import { CREATE_CAMERA_PAGE, DETAIL_CAMERA_PAGE } from "../../constants/routes";

export default function CameraPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Camera",
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
      headerRight: () => {
        return (
          <TouchableOpacity
            style={tw.mX4}
            onPress={() => props.navigation.navigate(CREATE_CAMERA_PAGE)}
          >
            <Text style={[tw.textWhite]}>Thêm</Text>
          </TouchableOpacity>
        );
      },
    });
  });
  const [cameraList, setCameraList] = useState([]);
  const dispatch = useDispatch();
  let flatList = null;

  const user = useSelector((state) => state.auth);
  useEffect(() => {
    onInit();
  }, []);

  async function onInit() {
    try {
      LoadingService.show();
      let cameras = await getAllCamera(
        API.CAMERA_LIST_API,
        null,
        null,
        user._id
      );
      LoadingService.hide();
      if (cameras) {
        setCameraList(cameras);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function renderItem({ item, index }) {
    return (
      <TouchableOpacity
        style={[tw.mX4, tw.rounded, tw.bgWhite, tw.shadowLg, tw.mB3]}
        onPress={() =>
          props.navigation.navigate(DETAIL_CAMERA_PAGE)
        }
      >
        <View style={tw.roundedLg}>
          <ImageBackground
            source={{
              uri: `${COMMON_APP.HOST_API}/api/files/image/${item.camera.camera_thumbnail}`,
            }}
            style={[tw.h48, tw.roundedTLg, { overflow: "hidden" }]}
          ></ImageBackground>
        </View>
        <View style={[tw.pX4, tw.pY3]}>
          <View style={[tw.flexRow, tw.alignCenter, tw.mB2]}>
            <Text
              style={[
                tw.fontBold,
                {
                  color: "#1776E8",
                  flex: 1,
                },
              ]}
            >
              Tên thiết bị: {item.camera_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function renderEmpty() {
    return (
      <View style={[tw.selfCenter, tw.p4]}>
        <Text style={[tw.selfCenter, { color: PRIMARY }]}>
          Không tìm thấy kết quả!
        </Text>
      </View>
    );
  }

  const memoList = useMemo(() => renderItem, [cameraList]);

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <FlatList
        ref={(c) => (flatList = c)}
        contentContainerStyle={[tw.pB4]}
        data={cameraList}
        renderItem={memoList}
        keyExtractor={(item, index) => `camera_${index}`}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
