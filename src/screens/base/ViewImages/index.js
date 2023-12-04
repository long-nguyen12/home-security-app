import Gallery from "react-native-image-gallery";
import React, { Component, useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import { BACKGROUND, PRIMARY } from "../../../constants/colors";
import { containerStyles } from "../../../stylesContainer";
import { useState } from "react";
import { tw } from "react-native-tailwindcss";
import BackIcon from "../../../assets/icons/whitearrow.svg";
import I18n from "../../../utilities/I18n";
import TrashIcon from "../../../assets/icons/trash.svg";

export default function ViewImage(props) {
    useLayoutEffect(() => {
        let { params } = props.route;
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
            headerTitle: params && params.titleParams ? params.titleParams : "",
            headerRight: () => (
                // <Text category={"h6"} style={[tw.textWhite, tw.mX4]}>
                //
                // </Text>
                <TouchableOpacity
                    style={[tw.mX4]}
                    onPress={() => {
                        if (
                            props.route.params.deleteImg &&
                            props.route.params.images &&
                            props.route.params.images.length
                        )
                            delImgFunc();
                    }}
                >
                    <TrashIcon />
                </TouchableOpacity>
            ),
            cardShadowEnabled: false,
            headerStyle: {
                backgroundColor: PRIMARY,
            },
            headerTitleStyle: {
                color: "white",
            },
        });
    });

    const [position, setPosition] = useState(
        props.route.params.initialPage || 0
    );

    useEffect(() => {
        let { images } = props.route.params;
        props.navigation.setParams({
            titleParams: "Ảnh " + (position + 1) + "/" + images.length,
        });
    }, []);

    function handlePaceScroll(event) {
        let { images } = props.route.params;
        if (event.position !== position) {
            setPosition(event.position);
            props.navigation.setParams({
                titleParams:
                    "Ảnh " + (event.position + 1) + "/" + images.length,
            });
        }
    }

    function delImgFunc() {
        Alert.alert(
            I18n.t("delete_data"),
            "",
            [
                {
                    text: I18n.t("cancel"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        let { images } = props.route.params;
                        let imgDel = images[position];
                        let uri = imgDel.source.uri;
                        images.splice(position, 1);
                        setPosition(
                            position === images.length ? position - 1 : position
                        );
                        props.navigation.setParams({
                            images: images,
                            titleParams:
                                "Ảnh " +
                                ((position === images.length
                                    ? position - 1
                                    : position) +
                                    1) +
                                "/" +
                                images.length,
                        });
                        props.route.params.delImgFunc(uri);
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={[containerStyles.content, { flexDirection: "column" }]}>
            {!!props.route.params.images.length && (
                <View style={{ flex: 1 }}>
                    <Gallery
                        initialPage={props.route.params.initialPage || 0}
                        onPageScroll={(event) => handlePaceScroll(event)}
                        style={{ flex: 1, backgroundColor: BACKGROUND }}
                        images={props.route.params.images}
                    />
                </View>
            )}
        </View>
    );
}
