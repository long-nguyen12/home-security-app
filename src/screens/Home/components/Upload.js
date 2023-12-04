import { Button, Text } from "@ui-kitten/components";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { PRIMARY } from "../../../constants/colors";
import { containerStyles } from "../../../stylesContainer";

import BackIcon from "../../../assets/icons/whitearrow.svg";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { CREATE_CAMERA_PAGE, SCAN_AREA_PAGE } from "../../../constants/routes";
import * as ImagePicker from "expo-image-picker";

import { Video, ResizeMode } from "expo-av";
import { postFile } from "../../../epics-reducers/services/uploadServices";
import LoadingService from "../../../components/Loading/LoadingService";

export default function UploadScreen(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Nhận dạng",
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
  let flatList = null;

  const user = useSelector((state) => state.auth);
  useEffect(() => {}, []);
  const video = useRef(null);

  const [dataSource, setDataSource] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [status, setStatus] = useState({});

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const { assets } = result;
      const fileData = assets[0];
      setIsVideo(fileData.type == "video");
      setDataSource(result.assets[0]);
    }
  };

  async function uploadFile() {
    LoadingService.show();
    let formData = new FormData();

    const { uri } = dataSource;
    const uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let name = isVideo ? "video.mp4" : "image.jpeg";
    fileType = isVideo ? `video/${fileType}` : `image/${fileType}`;

    formData.append("file", {
      uri: dataSource.uri,
      name: name,
      type: fileType,
    });
    const response = await postFile(formData);
    if (response) {
      props.navigation.navigate(SCAN_AREA_PAGE, response);
    }
    LoadingService.hide();
  }

  function renderResult() {
    return (
      <>
        {isVideo ? (
          <Video
            ref={video}
            style={tw.flex1}
            source={{
              uri: dataSource.uri || dataSource.file,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={{ uri: dataSource.uri || dataSource.file }}
            style={tw.flex1}
          />
        )}

        <View style={tw.flex1}>
          <Button style={[tw.selfCenter]} onPress={uploadFile} size="small">
            <Text style={{ color: "black" }}>Tiếp tục</Text>
          </Button>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <View style={[tw.selfCenter]}>
        <Button onPress={pickImage} size="small">
          <Text style={{ color: "black" }}>Chọn ảnh/video</Text>
        </Button>
      </View>
      {dataSource && renderResult()}
    </SafeAreaView>
  );
}
