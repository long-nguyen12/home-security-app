import React from "react";

import { tw } from "react-native-tailwindcss";

import { View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import Loader from "../../screens/App/Loader";

const Loading = () => {
    return (
        <View
            style={[
                tw.flex1,
                tw.itemsCenter,
                tw.justifyCenter,
                { backgroundColor: "rgba(0, 0, 0, 0.6)" },
            ]}
        >
            <Loader />
        </View>
    );
};

export default Loading;
