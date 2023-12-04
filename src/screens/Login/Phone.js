import React, {
    useLayoutEffect,
    useState,
    useEffect,
    useRef,
    createRef,
} from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Keyboard,
} from "react-native";
import { Button, Text, Input, Modal, Card } from "@ui-kitten/components";
import { tw } from "react-native-tailwindcss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "../App/Loader";

import { containerStyles } from "../../stylesContainer";
import { DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from "../../constants/variable";
import { BACKGROUND, HELPER_LINK_TEXT, PRIMARY } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
    APP_MAIN,
    HOME_PAGE,
    LOGIN_PAGE,
    LOGIN_SMS,
    REGISTER_PAGE,
    RESETPASSWORD_PAGE,
} from "../../constants/routes";
import RegisterSuccess from "../../assets/icons/registerSuccess.svg";
import BackIcon from "../../assets/icons/back.svg";
import { checkObject } from "../../epics-reducers/services/common";

export default function PhonePage(props) {
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
            title: "Xác nhận mã OTP",
            cardShadowEnabled: false,
            headerStyle: {
                backgroundColor: BACKGROUND,
            },
            headerShadowVisible: false,
        });
    });
    const pin1Ref = useRef();
    const pin2Ref = useRef();
    const pin3Ref = useRef();
    const pin4Ref = useRef();

    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);

    async function onFormSubmit() {
        if (
            pin1.trim() != "" &&
            pin2.trim() != "" &&
            pin3.trim() != "" &&
            pin4.trim() != "" &&
            active
        ) {
            if (parent === REGISTER_PAGE || parent === LOGIN_SMS) {
                setVisible(true);
                setTimeout(() => {
                    setVisible(false);
                    props.navigation.navigate(APP_MAIN, { screen: HOME_PAGE });
                }, 5000);
            } else props.navigation.navigate(RESETPASSWORD_PAGE);
        }
    }

    return (
        <SafeAreaView style={[containerStyles.content]}>
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.content}>
                    <Text style={[tw.mY16, tw.textCenter]}>
                        Chúng tôi đã gửi mã OTP vào số điện thoại của bạn Vui
                        lòng nhập vào phía dưới!
                    </Text>
                    <View style={[tw.flex1, tw.flexCol]}>
                        <View style={[tw.flexRow, tw.justifyBetween, tw.pX8]}>
                            <Input
                                style={[tw.w1_5]}
                                ref={pin1Ref}
                                maxLength={1}
                                size="large"
                                keyboardType={"numeric"}
                                value={pin1}
                                textStyle={[
                                    tw.fontBold,
                                    tw.textXl,
                                    tw.textCenter,
                                ]}
                                onChangeText={(value) => {
                                    setPin1(value);
                                    if (value != "") {
                                        pin2Ref.current?.focus();
                                    }
                                }}
                                onFocus={() => {
                                    if (pin1 == "") {
                                        pin1Ref.current?.focus();
                                    }
                                }}
                            />
                            <Input
                                style={[tw.w1_5]}
                                ref={pin2Ref}
                                maxLength={1}
                                size="large"
                                keyboardType={"numeric"}
                                value={pin2}
                                onChangeText={(value) => {
                                    setPin2(value);
                                    if (value != "") {
                                        pin3Ref.current?.focus();
                                    } else if (value == "") {
                                        pin1Ref.current?.focus();
                                    }
                                }}
                                onFocus={() => {
                                    console.log("focused here");
                                    if (pin1 == "") {
                                        pin1Ref.current?.focus();
                                    } else if (pin2 == "") {
                                        pin2Ref.current?.focus();
                                    }
                                }}
                                textStyle={[
                                    tw.fontBold,
                                    tw.textXl,
                                    tw.textCenter,
                                ]}
                            />
                            <Input
                                style={[tw.w1_5]}
                                ref={pin3Ref}
                                maxLength={1}
                                size="large"
                                keyboardType={"numeric"}
                                value={pin3}
                                onChangeText={(value) => {
                                    setPin3(value);
                                    if (value != "") {
                                        pin4Ref.current?.focus();
                                    } else if (value == "") {
                                        pin2Ref.current?.focus();
                                    }
                                }}
                                onFocus={() => {
                                    if (pin1 == "") {
                                        pin1Ref.current?.focus();
                                    } else if (pin2 == "") {
                                        pin2Ref.current?.focus();
                                    } else if (pin3 == "") {
                                        pin3Ref.current?.focus();
                                    }
                                }}
                                textStyle={[
                                    tw.fontBold,
                                    tw.textXl,
                                    tw.textCenter,
                                ]}
                            />
                            <Input
                                style={[tw.w1_5]}
                                ref={pin4Ref}
                                maxLength={1}
                                size="large"
                                keyboardType={"numeric"}
                                value={pin4}
                                onChangeText={(value) => {
                                    setPin4(value);
                                    if (value == "") {
                                        pin3Ref.current?.focus();
                                    }
                                    setActive(value ? true : false);
                                }}
                                onFocus={() => {
                                    if (pin1 == "") {
                                        pin1Ref.current?.focus();
                                    } else if (pin2 == "") {
                                        pin2Ref.current?.focus();
                                    } else if (pin3 == "") {
                                        pin3Ref.current?.focus();
                                    } else {
                                        pin4Ref.current?.focus();
                                    }
                                }}
                                textStyle={[
                                    tw.fontBold,
                                    tw.textXl,
                                    tw.textCenter,
                                ]}
                            />
                        </View>
                        <Button
                            style={[tw.mT8, { borderRadius: 40 }]}
                            onPress={onFormSubmit}
                            status={active ? "primary" : "basic"}
                        >
                            TIẾP TỤC
                        </Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <Modal visible={visible} backdropStyle={styles.backdrop}>
                <Card
                    style={[
                        tw.pY8,
                        tw.mX8,
                        tw.itemsCenter,
                        tw.alignCenter,
                        {
                            borderRadius: 40,
                        },
                    ]}
                >
                    <RegisterSuccess
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
                            {parent === REGISTER_PAGE
                                ? "ĐĂNG KÝ THÀNH CÔNG!"
                                : "ĐĂNG NHẬP THÀNH CÔNG!"}
                        </Text>
                        <Text style={[tw.textCenter]}>
                            {parent === REGISTER_PAGE
                                ? "Bạn đã đăng ký tài khoản thành công."
                                : "Bạn đã đăng nhập SMS thành công."}
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
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
