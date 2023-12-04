import React, {
    createRef,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import { TouchableOpacity, BackHandler } from "react-native";
import { CONSTANTS } from "../../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import ImageBrowser from "./components/ImageBrowser";
import I18n from "../../utilities/I18n";
import { PRIMARY } from "../../constants/colors";
import { Text } from "@ui-kitten/components";
import BackIcon from "../../assets/icons/whitearrow.svg";
import { tw } from "react-native-tailwindcss";

export default function ImageBrowserScreen(props) {
    const { navigation, route } = props;
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={tw.mX4}
                    onPress={() => navigation.goBack(null)}
                >
                    <BackIcon />
                </TouchableOpacity>
            ),
            headerTitle: "Chọn ảnh từ thiết bị",
            headerRight: () => (
                <TouchableOpacity
                    style={tw.mX4}
                    onPress={() =>
                        route.params.prepareCallback &&
                        route.params.prepareCallback()
                    }
                >
                    <Ionicons name="md-checkmark" size={20} color={"white"} />
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

    const imgBrowser = useRef();
    useEffect(() => {
        props.navigation.setParams({
            prepareCallback: () => prepareCallback(),
        });

        BackHandler.addEventListener("hardwareBackPress", () => {
            props.route.params.onGoBack(CONSTANTS.REJECT);
        });

        return () =>
            BackHandler.addEventListener("hardwareBackPress", () => {
                props.route.params.onGoBack(CONSTANTS.REJECT);
            });
    }, []);

    function prepareCallback() {
        if (imgBrowser) {
            imgBrowser.current?.prepareCallback();
        }
    }

    const onImageCallback = (callback) => {
        props.route.params.onGoBack(callback);
        props.navigation.goBack(null);
    };

    const onImageSelected = (selected) => {
        let selectedCount = Object.keys(selected).length;
        // let headerText = I18n.t("number_image_selected").format(selectedCount);
        let headerText = selectedCount + " đã chọn";
        let { max, total_exits } = props.route.params;
        if (!total_exits) total_exits = 0;
        if (selectedCount + total_exits === max)
            headerText =
                headerText +
                I18n.t("maximum_number_image").format(selectedCount);
        props.navigation.setOptions({ headerTitle: headerText });
    };

    let { max, total_exits } = props.route.params;
    if (!max) max = 5;
    if (!total_exits) total_exits = 0;
    return (
        <>
            <ImageBrowser
                ref={imgBrowser}
                max={
                    props.route.params && props.route.params.max
                        ? max - total_exits
                        : Infinity
                }
                callback={onImageCallback}
                onSelectImage={onImageSelected}
            />
        </>
    );
}
