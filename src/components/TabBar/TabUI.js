import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { CONSTANTS } from "../../constants/constants";
import TabsHandler from "./TabsHandler";
import TabShape from "./TabShape";

const { width: wWidth } = Dimensions.get("window");

function TabsUI(props) {
    const { tabs } = props;
    const { bottom } = useSafeArea();
    const tabWidth = useMemo(() => wWidth / tabs.length, [tabs.length]);

    return (
        <>
            <View
                {...{
                    height: CONSTANTS.NAVIGATION_BOTTOM_TABS_HEIGHT,
                    width: wWidth,
                }}
                position="absolute"
                backgroundColor="transparent"
                style={{ bottom }}
            >
                <TabShape {...{ tabWidth }} />
                <View {...StyleSheet.absoluteFill}>
                    <TabsHandler {...{ tabs, tabWidth }} />
                </View>
            </View>
        </>
    );
}

export default TabsUI;
