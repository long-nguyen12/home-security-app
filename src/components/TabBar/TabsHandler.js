import { Text } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import HomeOffIcon from "../../assets/menu_ico/homeoff.svg";
import HomeOnIcon from "../../assets/menu_ico/homeon.svg";
import NotiOffIcon from "../../assets/menu_ico/notioff.svg";
import NotiOnIcon from "../../assets/menu_ico/notion.svg";
import UserOffIcon from "../../assets/menu_ico/useroff.svg";
import UserOnIcon from "../../assets/menu_ico/useron.svg";
import { INSTRUCTION_TEXT, PRIMARY } from "../../constants/colors";
import { CONSTANTS } from "../../constants/constants";
import { HOME_PAGE, SETTING_PAGE, THONGBAO_PAGE } from "../../constants/routes";
import * as NavigationService from "../../epics-reducers/navigationServices";

function TabsHandler({ tabs, tabWidth }) {
    const navigation = NavigationService.getRef();
    const currentName = navigation?.getCurrentRoute();
    function getIcon(tab, name) {
        let routeName = currentName?.name;
        switch (tab) {
            case HOME_PAGE: {
                if (routeName == HOME_PAGE) {
                    return (
                        <>
                            <HomeOnIcon />
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: PRIMARY,
                                }}
                            >
                                {name}
                            </Text>
                        </>
                    );
                }
                return (
                    <>
                        <HomeOffIcon />
                        <Text
                            style={{
                                fontSize: 11,
                                color: INSTRUCTION_TEXT,
                            }}
                        >
                            {name}
                        </Text>
                    </>
                );
            }
            case THONGBAO_PAGE: {
                if (routeName == THONGBAO_PAGE) {
                    return (
                        <>
                            <NotiOnIcon />
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: INSTRUCTION_TEXT,
                                }}
                            >
                                {name}
                            </Text>
                        </>
                    );
                }
                return (
                    <>
                        <NotiOffIcon />
                        <Text
                            style={{
                                fontSize: 11,
                                color: INSTRUCTION_TEXT,
                            }}
                        >
                            {name}
                        </Text>
                    </>
                );
            }
            case SETTING_PAGE: {
                if (routeName == SETTING_PAGE) {
                    return (
                        <>
                            <UserOnIcon />
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: PRIMARY,
                                }}
                            >
                                {name}
                            </Text>
                        </>
                    );
                }
                return (
                    <>
                        <UserOffIcon />
                        <Text
                            style={{
                                fontSize: 11,
                                color: INSTRUCTION_TEXT,
                            }}
                        >
                            {name}
                        </Text>
                    </>
                );
            }
            default:
                break;
        }
        return null;
    }

    return (
        <View flexDirection="row">
            {tabs.map((tab, key) => {
                return (
                    <TouchableOpacity
                        {...{ key }}
                        onPress={() => {
                            NavigationService.navigate(tab.route);
                        }}
                    >
                        <View
                            width={tabWidth}
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            height={CONSTANTS.NAVIGATION_BOTTOM_TABS_HEIGHT}
                        >
                            {getIcon(tab.route, tab.name)}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabsHandler;
