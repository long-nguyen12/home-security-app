import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { tw } from "react-native-tailwindcss";
import BackIcon from "../../assets/icons/whitearrow.svg";
import HomeIcon from "../../assets/menu_ico/homeon.svg";
import { PRIMARY } from "../../constants/colors";
import { Text } from "@ui-kitten/components";
import { containerStyles } from "../../stylesContainer";
import { COMMON_APP } from "../../constants";
import { timeFormatter } from "../../helper/dateFormat";

export default function ChiTietThongBao(props) {
  const { data } = props.route.params;
  useLayoutEffect(() => {
    props.navigation.setOptions({
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
      headerTitle: "Chi tiết cảnh báo",
      //   headerRight: () => {
      //     return (
      //       <TouchableOpacity
      //         style={tw.mX4}
      //         onPress={() => props.navigation.popToTop()}
      //       >
      //         <HomeIcon />
      //       </TouchableOpacity>
      //     );
      //   },
      title: null,
      cardShadowEnabled: false,
      headerStyle: {
        backgroundColor: PRIMARY,
      },
      headerTitleStyle: {
        color: "white",
      },
      headerTitleAlign: "center",
    });
  });

  console.log(`${COMMON_APP.HOST_API}/detection/${data.detection_path}`);

  return (
    <ScrollView
      style={[containerStyles.content]}
      contentContainerStyle={[tw.pT4, tw.pX4]}
    >
      {/* <ScrollView style={[containerStyles.content, tw.pT4, tw.pX4]}> */}
      <Text style={[tw.fontBold, tw.textJustify]}>
        Phát hiện đối tượng trong vùng theo dõi
      </Text>
      <Text style={{ color: "#878787" }}>{timeFormatter(data.created_at)}</Text>
      <Image
        resizeMode="contain"
        source={{
          uri: `${COMMON_APP.HOST_API}/detection/${data.detection_path}`,
        }}
        style={[
          tw.flexRow,
          tw.itemsCenter,
          tw.selfCenter,
          {
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height / 3,
          },
        ]}
      />
    </ScrollView>
  );
}
