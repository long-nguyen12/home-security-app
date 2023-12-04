import { Button, Input, Text } from "@ui-kitten/components";
import { Formik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { tw } from "react-native-tailwindcss";
import { useDispatch } from "react-redux";
import EyeHideIcon from "../../assets/icons/hidepassword.svg";
import InactiveHideIcon from "../../assets/icons/inactiveHide.svg";
import EyeUnHideIcon from "../../assets/icons/unhidepassword.svg";
import { PRIMARY } from "../../constants/colors";
import {
  FORGOTPASSWORD_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE
} from "../../constants/routes";
import { containerStyles } from "../../stylesContainer";
import { userLoginRoutine } from "./saga/routines";
import { LoginSchema } from "./schemas/schemas";

export default function LoginPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Đăng nhập",
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

  const [hidePassword, setHidePassword] = useState(true);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  async function onFormSubmit(values) {
    const data = {
      username: values.username,
      password: values.password,
    };
    dispatch(userLoginRoutine.trigger(data));
  }

  const toggleSecureEntry = () => {
    setHidePassword(!hidePassword);
  };

  function renderHidePasswordIcon() {
    return (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        {active ? (
          hidePassword ? (
            <EyeHideIcon />
          ) : (
            <EyeUnHideIcon />
          )
        ) : (
          <InactiveHideIcon />
        )}
      </TouchableWithoutFeedback>
    );
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <View style={tw.mT4}>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
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
                  placeholder="Nhập tên đăng nhập"
                  onChangeText={(text) => {
                    setFieldValue("username", text);
                  }}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  size="large"
                  label={() => (
                    <Text category={"label"} style={[tw.textSm, tw.mB2]}>
                      Tên đăng nhập
                    </Text>
                  )}
                  caption={() => {
                    if (errors.username && touched.username)
                      return <Text category={"c2"}>{errors.username}</Text>;
                    return <View></View>;
                  }}
                />
                <Input
                  placeholder="Nhập mật khẩu"
                  onChangeText={(text) => {
                    setActive(text ? true : false);
                    setFieldValue("password", text);
                  }}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={[tw.mT2]}
                  size="large"
                  secureTextEntry={hidePassword}
                  accessoryRight={renderHidePasswordIcon}
                  label={() => (
                    <Text category={"label"} style={[tw.textSm, tw.mB2]}>
                      Mật khẩu
                    </Text>
                  )}
                  caption={() => {
                    if (errors.password && touched.password)
                      return <Text category={"c2"}>{errors.password}</Text>;
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
                  <View>
                    <Text></Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(FORGOTPASSWORD_PAGE, {
                        parent: LOGIN_PAGE,
                      })
                    }
                  >
                    <Text style={containerStyles.helper_text_link}>
                      Quên mật khẩu?
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button style={{ marginTop: 8 }} onPress={handleSubmit}>
                  <Text style={{ color: "black" }}>ĐĂNG NHẬP</Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
        <View style={[tw.flex1, tw.flexRow, tw.itemsCenter, tw.justifyCenter]}>
          <Text>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(REGISTER_PAGE)}
          >
            <Text style={containerStyles.helper_text_link}>Đăng ký</Text>
          </TouchableOpacity>
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
