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
import {
    Button,
    Text,
    Input,
    Icon,
    RadioGroup,
    Radio,
} from "@ui-kitten/components";
import { tw } from "react-native-tailwindcss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { LoginSchema, SignupSchema } from "./schemas/schemas";
import { containerStyles } from "../../stylesContainer";
import { DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from "../../constants/variable";
import { BACKGROUND, HELPER_LINK_TEXT } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { REGISTER_PAGE, PHONE_PAGE } from "../../constants/routes";
import BackIcon from "../../assets/icons/back.svg";
import {
    checkEmptyProperty,
    showToast,
} from "../../epics-reducers/services/common";
import EyeHideIcon from "../../assets/icons/hidepassword.svg";
import EyeUnHideIcon from "../../assets/icons/unhidepassword.svg";
import InactiveHideIcon from "../../assets/icons/inactiveHide.svg";
import I18n from "../../utilities/I18n";

export default function RegisterPage(props) {
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
            headerTitle: "Đăng kí tài khoản",
            headerRight: () => {
                return (
                    <View>
                        <Text></Text>
                    </View>
                );
            },
            cardShadowEnabled: false,
            headerStyle: {
                backgroundColor: BACKGROUND,
            },
            headerShadowVisible: false,
        });
    });

    const [hidePassword, setHidePassword] = useState(true);
    const [hideRePassword, setHideRePassword] = useState(true);
    const [active, setActive] = useState(false);
    const [hidePasswordActive, setHidePasswordActive] = useState(false);
    const [hideRePasswordActive, setHideRePasswordActive] = useState(false);

    const initialValues = {
        username: "",
        password: "",
        fullname: "",
        re_password: "",
        phone: "",
    };

    async function onFormSubmit(values) {
        let citizen;
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
                                        <Text
                                            category={"label"}
                                            style={[tw.textSm, tw.mB2]}
                                        >
                                            Họ và tên
                                        </Text>
                                    )}
                                    onChangeText={(text) => {
                                        setFieldValue("fullname", text);
                                        setActive(
                                            checkEmptyProperty(
                                                Object.assign({}, values, {
                                                    fullname: text,
                                                })
                                            )
                                        );
                                    }}
                                    onBlur={handleBlur("fullname")}
                                    value={values.fullname}
                                    style={{ borderRadius: 14 }}
                                    size="large"
                                    caption={() => {
                                        if (errors.fullname && touched.fullname)
                                            return (
                                                <Text category={"c2"}>
                                                    {errors.fullname}
                                                </Text>
                                            );
                                        return <View></View>;
                                    }}
                                />
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
                                    onChangeText={(text) => {
                                        setFieldValue("phone", text);
                                        setActive(
                                            checkEmptyProperty(
                                                Object.assign({}, values, {
                                                    phone: text,
                                                })
                                            )
                                        );
                                    }}
                                    onBlur={handleBlur("phone")}
                                    value={values.phone}
                                    style={[tw.mT2, { borderRadius: 14 }]}
                                    size="large"
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
                                <Input
                                    placeholder="Nhập tên đăng nhập"
                                    label={() => (
                                        <Text
                                            category={"label"}
                                            style={[tw.textSm, tw.mB2]}
                                        >
                                            Tên đăng nhập
                                        </Text>
                                    )}
                                    onChangeText={(text) => {
                                        setFieldValue("username", text);
                                        setActive(
                                            checkEmptyProperty(
                                                Object.assign({}, values, {
                                                    username: text,
                                                })
                                            )
                                        );
                                    }}
                                    onBlur={handleBlur("username")}
                                    value={values.username}
                                    style={[tw.mT2, { borderRadius: 14 }]}
                                    size="large"
                                    caption={() => {
                                        if (errors.username && touched.username)
                                            return (
                                                <Text category={"c2"}>
                                                    {errors.username}
                                                </Text>
                                            );
                                        return <View></View>;
                                    }}
                                />
                                <Input
                                    placeholder="Nhập mật khẩu"
                                    label={() => (
                                        <Text
                                            category={"label"}
                                            style={[tw.textSm, tw.mB2]}
                                        >
                                            Mật khẩu
                                        </Text>
                                    )}
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
                                    value={values.password}
                                    style={[tw.mT2, { borderRadius: 14 }]}
                                    accessoryRight={renderHidePasswordIcon}
                                    size="large"
                                    secureTextEntry={hidePassword}
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
                                    placeholder="Nhập lại mật khẩu"
                                    label={() => (
                                        <Text
                                            category={"label"}
                                            style={[tw.textSm, tw.mB2]}
                                        >
                                            Nhập lại mật khẩu
                                        </Text>
                                    )}
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
                                    value={values.re_password}
                                    style={[tw.mT2, { borderRadius: 14 }]}
                                    accessoryRight={renderHideRePasswordIcon}
                                    size="large"
                                    secureTextEntry={hideRePassword}
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
                            <Text style={containerStyles.helper_text_link}>
                                Đăng nhập
                            </Text>
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
});
