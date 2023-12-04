import React, { useLayoutEffect, useState, useEffect } from "react";
import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Button, Text, Input } from "@ui-kitten/components";
import { tw } from "react-native-tailwindcss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import {
    ForgotPasswordSchema,
    LoginSchema,
    SignupSchema,
} from "./schemas/schemas";
import { containerStyles } from "../../stylesContainer";
import { DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from "../../constants/variable";
import { BACKGROUND, HELPER_LINK_TEXT } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
    FORGOTPASSWORD_PAGE,
    LOGIN_PAGE,
    PHONE_PAGE,
} from "../../constants/routes";
import BackIcon from "../../assets/icons/back.svg";

export default function ForgotPasswordPage(props) {
    const { parent } = props.route.params;
    useLayoutEffect(() => {
        props.navigation.setOptions({
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
            title: parent === LOGIN_PAGE ? "Quên mật khẩu" : "Đăng nhập SMS",
            cardShadowEnabled: false,
            headerStyle: {
                backgroundColor: BACKGROUND,
            },
            headerShadowVisible: false,
        });
    });

    const initialValues = {
        phone: "",
    };
    const [active, setActive] = useState(false);

    async function onFormSubmit(values) {
        if (active) {
            props.navigation.navigate(PHONE_PAGE, {
                parent: parent,
            });
        }
    }

    return (
        <SafeAreaView style={[containerStyles.content]}>
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.content}>
                    <Text style={[tw.mY16, tw.textCenter]}>
                        Vui lòng nhập số điện thoại để nhận mã xác thực được gửi
                        đến
                    </Text>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={(values) => onFormSubmit(values)}
                    >
                        {({
                            setFieldValue,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                }}
                            >
                                <Input
                                    placeholder="Nhập số điện thoại"
                                    label={() => (
                                        <Text
                                            category={"label"}
                                            style={[tw.textSm, tw.mB2]}
                                        >
                                            Số điện thoại
                                        </Text>
                                    )}
                                    style={{ borderRadius: 14 }}
                                    size="large"
                                    onChangeText={(text) => {
                                        setActive(text ? true : false);
                                        setFieldValue("phone", text);
                                    }}
                                    onBlur={handleBlur("phone")}
                                    value={values.phone}
                                    caption={() => {
                                        if (errors.phone && touched.phone)
                                            return (
                                                <Text category={"c2"}>
                                                    {errors.phone}
                                                </Text>
                                            );
                                        return <View></View>;
                                    }}
                                />

                                <Button
                                    style={[tw.mT8, { borderRadius: 40 }]}
                                    onPress={handleSubmit}
                                    status={active ? "primary" : "basic"}
                                >
                                    TIẾP TỤC
                                </Button>
                            </View>
                        )}
                    </Formik>
                </View>
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
    image: {
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "contain",
    },
});
