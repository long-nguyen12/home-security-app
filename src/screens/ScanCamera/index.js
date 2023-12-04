import React, { useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { PRIMARY } from "../../constants/colors";
import BackButton from "../../components/HeaderBar/BackButton";
import HomeButton from "../../components/HeaderBar/HomeButton";
import {
    uploadImage,
    uploadImages,
} from "../../epics-reducers/services/fileImageServices";
import { Text } from "@ui-kitten/components";
import { tw } from "react-native-tailwindcss";
import LoadingService from "../../components/Loading/LoadingService";

export default function ScanCameraPage(props) {
    const { images } = props.route.params;
    console.log(images);
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => <BackButton navigation={props.navigation} />,
            headerRight: () => <HomeButton navigation={props.navigation} />,
            headerTitle: "Quét bằng camera",
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

    const [text, setText] = useState(null);

    useEffect(() => {
        extractImage();
    }, []);

    async function extractImage() {
        LoadingService.show();
        let data = await uploadImage(images);
        setText(data);
        LoadingService.hide();
    }

    return (
        <View style={tw.p4}>
            {text &&
                text.map((item, i) => <Text key={`text_${i}`}>{item}</Text>)}
        </View>
    );
}
