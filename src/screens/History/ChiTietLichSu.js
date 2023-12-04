import React, { useLayoutEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import BackIcon from "../../assets/icons/whitearrow.svg";
import HomeIcon from "../../assets/menu_ico/homeon.svg";
import { PRIMARY } from "../../constants/colors";
import { Text } from "@ui-kitten/components";
import { containerStyles } from "../../stylesContainer";
import { COMMON_APP } from "../../constants";
import { timeFormatter } from "../../helper/dateFormat";

export default function ChiTietLichSu(props) {
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
      headerTitle: "Chi tiết lịch sử",
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
    <View style={[containerStyles.content, tw.pT4, tw.pX4]}>
      <Text style={[tw.fontBold, tw.textJustify]}>
        Phát hiện đối tượng trong vùng theo dõi
      </Text>
      <Text style={{ color: "#878787" }}>{timeFormatter(data.created_at)}</Text>
      <Image
        resizeMode="contain"
        source={{
          uri: `${COMMON_APP.HOST_API}/detection/${data.result_path}`,
        }}
        style={[tw.hFull, tw._mT24]}
      />
    </View>
  );
}
