import React, { useLayoutEffect, useState, useEffect } from "react";
import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import { Button, Text, Input, Modal, Card } from "@ui-kitten/components";
import { tw } from "react-native-tailwindcss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { ResetPasswordSchema } from "./schemas/schemas";
import { containerStyles } from "../../stylesContainer";
import { DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from "../../constants/variable";
import { BACKGROUND, PRIMARY } from "../../constants/colors";
import ResetSuccess from "../../assets/icons/changePassword.svg";
import Loader from "../App/Loader";
import BackIcon from "../../assets/icons/back.svg";
import EyeHideIcon from "../../assets/icons/hidepassword.svg";
import EyeUnHideIcon from "../../assets/icons/unhidepassword.svg";
import InactiveHideIcon from "../../assets/icons/inactiveHide.svg";
import { checkEmptyProperty } from "../../epics-reducers/services/common";
import { HOME_PAGE, MAIN } from "../../constants/routes";

export default function ResetPasswordPage(props) {
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
            title: "Đặt lại mật khẩu",
            cardShadowEnabled: false,
            headerStyle: {
                backgroundColor: BACKGROUND,
            },
            headerShadowVisible: false,
        });
    });
    const [hidePassword, setHidePassword] = useState(true);
    const [hideRePassword, setHideRePassword] = useState(true);
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);
    const [hidePasswordActive, setHidePasswordActive] = useState(false);
    const [hideRePasswordActive, setHideRePasswordActive] = useState(false);

    const initialValues = {
        password: "",
        re_password: "",
    };

    async function onFormSubmit(values) {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            props.navigation.navigate(MAIN, {
                screen: HOME_PAGE
            })
        }, 2000);
    }

    function renderHidePasswordIcon() {
        return (
            <TouchableWithoutFeedback
                onPress={() => setHidePassword(!hidePassword)}
            >
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
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.content}>
                    <Text style={[tw.mY12, tw.textCenter]}>
                        Vui lòng nhập và xác nhận mật khẩu mới
                    </Text>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ResetPasswordSchema}
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
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                }}
                            >
                                <Input
                                    placeholder="Độ dài hơn 6 kí tự và chứa kí tự"
                                    label={() => (
                                        <Text
                                            category={"label"}
                                            style={[tw.textSm, tw.mB2]}
                                        >
                                            Mật khẩu
                                        </Text>
                                    )}
                                    style={{ borderRadius: 14 }}
                                    size="large"
                                    onChangeText={(text) => {
                                        setFieldValue("password", text);
                                        setHidePasswordActive(
                                            text ? true : false
                                        );
                                        setActive(
                                            checkEmptyProperty(
                                                Object.assign({}, values, {
                                                    password: text,
                                                })
                                            )
                                        );
                                    }}
                                    onBlur={handleBlur("password")}
                                    secureTextEntry={hidePassword}
                                    accessoryRight={renderHidePasswordIcon}
                                    value={values.password}
                                    caption={() => {
                                        if (errors.password && touched.password)
                                            return (
                                                <Text category={"c2"}>
                                                    {errors.password}
                                                </Text>
                                            );
                                        return <View></View>;
                                    }}
                                />
                                <Input
                                    placeholder="Nhập mật khẩu mới"
                                    label={() => (
                                        <Text
                                            category={"label"}
                                            style={[tw.textSm, tw.mB2]}
                                        >
                                            Nhập lại mật khẩu
                                        </Text>
                                    )}
                                    style={[tw.mT2, { borderRadius: 14 }]}
                                    size="large"
                                    onChangeText={(text) => {
                                        setFieldValue("re_password", text);
                                        setHideRePasswordActive(
                                            text ? true : false
                                        );
                                        setActive(
                                            checkEmptyProperty(
                                                Object.assign({}, values, {
                                                    password: text,
                                                })
                                            )
                                        );
                                    }}
                                    onBlur={handleBlur("re_password")}
                                    secureTextEntry={hideRePassword}
                                    accessoryRight={renderHideRePasswordIcon}
                                    value={values.re_password}
                                    caption={() => {
                                        if (
                                            errors.re_password &&
                                            touched.re_password
                                        )
                                            return (
                                                <Text category={"c2"}>
                                                    {errors.re_password}
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
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}
            >
                <Card
                    style={[
                        tw.pY8,
                        tw.mX8,
                        {
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 40,
                        },
                    ]}
                >
                    <ResetSuccess
                        style={{
                            alignSelf: "center",
                        }}
                    />
                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={[
                                tw.textCenter,
                                tw.mY4,
                                tw.fontBold,
                                { color: PRIMARY },
                            ]}
                        >
                            ĐỔI MẬT KHẨU THÀNH CÔNG!
                        </Text>
                        <Text style={[tw.textCenter]}>
                            Bạn đã cập nhập mật khẩu thành công.
                        </Text>
                        <Text style={[tw.textCenter]}>
                            Tiếp theo bạn sẽ được chuyển hướng đến trang chủ chỉ
                            trong vài giây!
                        </Text>
                    </View>
                    <View style={tw.mT8}>
                        <Loader />
                    </View>
                </Card>
            </Modal>
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
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
