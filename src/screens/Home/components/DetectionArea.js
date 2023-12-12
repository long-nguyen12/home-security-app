import { Button, Modal, Text } from "@ui-kitten/components";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { tw } from "react-native-tailwindcss";
import { PRIMARY } from "../../../constants/colors";
import { containerStyles } from "../../../stylesContainer";

import BackIcon from "../../../assets/icons/whitearrow.svg";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Polyline } from "react-native-svg";
import { useSelector } from "react-redux";
import { COMMON_APP } from "../../../constants";
import * as ROUTES from "../../../constants/routes";
import * as navigationService from "../../../epics-reducers/navigationServices";
import { showToast } from "../../../epics-reducers/services/common";
import { postCoords } from "../../../epics-reducers/services/uploadServices";
import Loader from "../../App/Loader";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function DetectionAreaScreen(props) {
  const { params } = props.route;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Vùng nhận dạng",
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

  const svgRef = useRef(null);
  const user = useSelector((state) => state.auth);
  const [points, setPoints] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [dataSource, setDataSource] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let uri = `${COMMON_APP.HOST_API}/thumbnail/${params.thumbnail}`;
    setDataSource(uri);
    Image.getSize(uri, (width, height) => {
      const ratio = (screenWidth * 1.0) / width;
      const newHeight = height * ratio;

      setImageSize({ width: screenWidth, height: newHeight });
    });
  }, []);

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    if (points.length < 4) {
      let coords = [...points, { x: locationX, y: locationY }];
      setPoints(coords);
    }
  };

  function Drawing() {
    return (
      <View style={[tw.wFull]}>
        <Image
          resizeMode="contain"
          source={{ uri: dataSource }}
          style={{ width: imageSize.width, height: imageSize.height }}
          // onTouchStart={(event) => handlePress(event)}

          onStartShouldSetResponder={() => true}
          onResponderGrant={handlePress}
        />
        <Svg
          ref={svgRef}
          width={imageSize.width}
          height={imageSize.height}
          // style={{ position: "absolute" }}
          // style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}
        >
          {points.map((point, index) => (
            <Circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={5} // Radius of the circle
              fill="red"
            />
          ))}
          {points.length > 1 && (
            <Polyline
              points={points.map((point) => `${point.x},${point.y}`).join(" ")}
              fill="none"
              stroke="blue"
              strokeWidth="2"
            />
          )}
        </Svg>
      </View>
    );
  }

  async function onSubmit() {
    if (points.length == 4) {
      setLoading(true);
      const { path } = params;
      let data = {};
      data.video = path;
      data.width = Math.round(imageSize.width);
      data.height = Math.round(imageSize.height);
      points.map((item, index) => {
        data[`point_${index + 1}`] = item;
      });
      const res = await postCoords(data);
      if (res) {
        navigationService.replace(ROUTES.APP_MAIN);
      } else {
        showToast("Vui lòng thử lại");
      }
      setLoading(false);
    } else {
      showToast("Vui lòng chọn đủ 4 điểm");
    }
  }

  function onReset() {
    setPoints([]);
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <Modal visible={loading} backdropStyle={styles.backdrop}>
        <Loader />
      </Modal>
      <View style={[tw.selfCenter, tw.mB2]}>
        <Text>Vui lòng chọn khu vực để phát hiện</Text>
      </View>
      <Drawing />
      <View style={[tw.flexRow, tw.mY2, tw.selfCenter]}>
        <Button style={[tw.selfCenter, tw.mX2]} onPress={onReset} size="small">
          <Text style={{ color: "black" }}>Vẽ lại</Text>
        </Button>
        <Button style={[tw.selfCenter, tw.mX2]} onPress={onSubmit} size="small">
          <Text style={{ color: "black" }}>Tiếp tục</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
