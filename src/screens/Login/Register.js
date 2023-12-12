import { Button, Input, Modal, Text } from "@ui-kitten/components";
import { Formik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { tw } from "react-native-tailwindcss";
import BackIcon from "../../assets/icons/whitearrow.svg";
import EyeHideIcon from "../../assets/icons/hidepassword.svg";
import InactiveHideIcon from "../../assets/icons/inactiveHide.svg";
import EyeUnHideIcon from "../../assets/icons/unhidepassword.svg";
import LoadingService from "../../components/Loading/LoadingService";
import { BACKGROUND, PRIMARY } from "../../constants/colors";
import { DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from "../../constants/variable";
import {
  checkEmptyProperty,
  showToast,
} from "../../epics-reducers/services/common";
import { userRegister } from "../../epics-reducers/services/userServices";
import { containerStyles } from "../../stylesContainer";
import { SignupSchema } from "./schemas/schemas";
import Loader from "../App/Loader";

export default function RegisterPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Đăng kí tài khoản",
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={tw.mL4}
            onPress={() => props.navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
        );
      },
      headerStyle: {
        backgroundColor: PRIMARY,
      },
      headerTitleStyle: {
        color: "white",
      },
      headerTitleAlign: "center",
    });
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [hideRePassword, setHideRePassword] = useState(true);
  const [hidePasswordActive, setHidePasswordActive] = useState(false);
  const [hideRePasswordActive, setHideRePasswordActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
    full_name: "",
    re_password: "",
  };

  async function onFormSubmit(values) {
    console.log(values);
    delete values.re_password;
    setLoading(true);
    let user = await userRegister(values);
    if (user) {
      showToast("Đăng kí tài khoản thành công!");
      props.navigation.goBack();
    }
    setLoading(false);
  }

  function renderHidePasswordIcon() {
    return (
      <TouchableWithoutFeedback onPress={() => setHidePassword(!hidePassword)}>
        {!hidePasswordActive ? (
          <InactiveHideIcon />
        ) : hidePassword ? (
          <EyeHideIcon />
        ) : (
          <EyeUnHideIcon />
        )}
      </TouchableWithoutFeedback>
    );
  }

  function renderHideRePasswordIcon() {
    return (
      <TouchableWithoutFeedback
        onPress={() => setHideRePassword(!hideRePassword)}
      >
        {!hideRePasswordActive ? (
          <InactiveHideIcon />
        ) : hideRePassword ? (
          <EyeHideIcon />
        ) : (
          <EyeUnHideIcon />
        )}
      </TouchableWithoutFeedback>
    );
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <Modal visible={loading} backdropStyle={styles.backdrop}>
        <Loader />
      </Modal>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <ScrollView style={styles.content}>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
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
              <View style={tw.mT4}>
                <Input
                  placeholder="Nhập họ tên đầy đủ"
                  label={() => (
                    <Text category={"label"} style={[tw.textSm, tw.mB2]}>
                      Họ và tên
                    </Text>
                  )}
                  onChangeText={(text) => {
                    setFieldValue("full_name", text);
                  }}
                  onBlur={handleBlur("full_name")}
                  value={values.full_name}
                  size="large"
                  caption={() => {
                    if (errors.full_name && touched.full_name)
                      return <Text category={"c2"}>{errors.full_name}</Text>;
                    return <View></View>;
                  }}
                />
                <Input
                  placeholder="Nhập tên đăng nhập"
                  label={() => (
                    <Text category={"label"} style={[tw.textSm, tw.mB2]}>
                      Tên đăng nhập
                    </Text>
                  )}
                  onChangeText={(text) => {
                    setFieldValue("username", text);
                  }}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  style={[tw.mT2]}
                  size="large"
                  caption={() => {
                    if (errors.username && touched.username)
                      return <Text category={"c2"}>{errors.username}</Text>;
                    return <View></View>;
                  }}
                />
                <Input
                  placeholder="Nhập mật khẩu"
                  label={() => (
                    <Text category={"label"} style={[tw.textSm, tw.mB2]}>
                      Mật khẩu
                    </Text>
                  )}
                  onChangeText={(text) => {
                    setFieldValue("password", text);
                    setHidePasswordActive(text ? true : false);
                  }}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={[tw.mT2]}
                  accessoryRight={renderHidePasswordIcon}
                  size="large"
                  secureTextEntry={hidePassword}
                  caption={() => {
                    if (errors.password && touched.password)
                      return <Text category={"c2"}>{errors.password}</Text>;
                    return <View></View>;
                  }}
                />
                <Input
                  placeholder="Nhập lại mật khẩu"
                  label={() => (
                    <Text category={"label"} style={[tw.textSm, tw.mB2]}>
                      Nhập lại mật khẩu
                    </Text>
                  )}
                  onChangeText={(text) => {
                    setFieldValue("re_password", text);
                    setHideRePasswordActive(text ? true : false);
                  }}
                  onBlur={handleBlur("re_password")}
                  value={values.re_password}
                  style={[tw.mT2]}
                  accessoryRight={renderHideRePasswordIcon}
                  size="large"
                  secureTextEntry={hideRePassword}
                  caption={() => {
                    if (errors.re_password && touched.re_password)
                      return <Text category={"c2"}>{errors.re_password}</Text>;
                    return <View></View>;
                  }}
                />
                <Button
                  style={[tw.mT8]}
                  onPress={handleSubmit}
                  status={"primary"}
                >
                  Đăng kí
                </Button>
              </View>
            )}
          </Formik>
          <View
            style={[
              tw.flex1,
              tw.flexRow,
              tw.itemsCenter,
              tw.justifyCenter,
              tw.mT16,
            ]}
          >
            <Text>Bạn đã có tài khoản? </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Text style={containerStyles.helper_text_link}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: (DEVICE_HEIGHT - STATUS_BAR_HEIGHT) / 4,
  },
  content: {
    height: ((DEVICE_HEIGHT - STATUS_BAR_HEIGHT) * 2) / 3,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
