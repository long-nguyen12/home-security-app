import React, { useEffect, useLayoutEffect } from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { tw } from "react-native-tailwindcss";
import { PRIMARY } from "../../../constants/colors";
import { containerStyles } from "../../../stylesContainer";

import BackIcon from "../../../assets/icons/whitearrow.svg";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import LoadingService from "../../../components/Loading/LoadingService";
import { API } from "../../../constants";
import {
  addNewCamera,
  getAllCamera,
} from "../../../epics-reducers/services/cameraServices";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { View } from "react-native";
import { CameraSchema } from "../schemas/schemas";
import { Button, Input, Text } from "@ui-kitten/components";

export default function CreateCameraPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Thêm mới",
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
  const initialValues = {
    uuid: "",
    camera_name: "",
  };
  const user = useSelector((state) => state.auth);
  useEffect(() => {}, []);

  async function onFormSubmit(values) {
    const data = {
      user_id: user._id,
      uuid: values.uuid,
    };
    let res = await addNewCamera(data);
    console.log(res);
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <View>
          <Formik
            initialValues={initialValues}
            validationSchema={CameraSchema}
            onSubmit={(values) => onFormSubmit(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View>
                <Input
                  placeholder="Nhập mã thiết bị"
                  onChangeText={(text) => {
                    setFieldValue("uuid", text);
                  }}
                  onBlur={handleBlur("uuid")}
                  value={values.uuid}
                  size="large"
                  label={() => (
                    <Text category={"label"} style={[tw.textSm, tw.mB2]}>
                      Mã thiết bị
                    </Text>
                  )}
                  caption={() => {
                    if (errors.uuid && touched.uuid)
                      return <Text category={"c2"}>{errors.uuid}</Text>;
                    return <View></View>;
                  }}
                />
                <Input
                  placeholder="Nhập tên thiết bị"
                  onChangeText={(text) => {
                    setFieldValue("camera_name", text);
                  }}
                  onBlur={handleBlur("camera_name")}
                  value={values.camera_name}
                  size="large"
                  label={() => (
                    <Text category={"label"} style={[tw.textSm, tw.mB2]}>
                      Tên thiết bị
                    </Text>
                  )}
                  caption={() => {
                    if (errors.camera_name && touched.camera_name)
                      return <Text category={"c2"}>{errors.camera_name}</Text>;
                    return <View></View>;
                  }}
                />
                <View
                  style={[
                    tw.mY3,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <Button style={{ marginTop: 8 }} onPress={handleSubmit}>
                    <Text style={{ color: "black" }}>Thêm mới</Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 20,
  },
});
