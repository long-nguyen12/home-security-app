import React, { createRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Space from "../Space";
import { DEVICE_WIDTH } from "../../../constants/variable";
import { Button, Text } from "@ui-kitten/components";
import { IMAGE_BROWSER_PAGE, VIEW_IMAGE_PAGE } from "../../../constants/routes";
import { THEMES } from "../../../stylesContainer";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import PlusIcon from "../../../assets/icons/plus.svg";
import GalleryIcon from "../../../assets/icons/gallery.svg";
import CameraIcon from "../../../assets/icons/camera.svg";
import { tw } from "react-native-tailwindcss";
import { PRIMARY } from "../../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { CONSTANTS } from "../../../constants";
import {
    convertImagesGallery,
    showToast,
} from "../../../epics-reducers/services/common";
import I18n from "../../../utilities/I18n";
import { Camera } from "expo-camera";

export class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemSize: (DEVICE_WIDTH - 40) / 3,
            imagesGallery: [],
            imageUpload: [],
        };

        this.delImgFunc = this.delImgFunc.bind(this);
        this.actionSheetRef = createRef();
    }
    delImgFunc(uri) {
        this.deleteImgFunc(uri);
    }

    showActionSheet() {
        SheetManager.show("actionSheet");
    }

    async pickImage() {
        if (this.state.disable) return;
        let { imagesGallery } = this.state;
        const { status: statusCameraRoll } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (statusCameraRoll === "granted") {
            this.props.navigation.navigate(IMAGE_BROWSER_PAGE, {
                max: 5,
                total_exits: imagesGallery ? imagesGallery.length : 0,
                onGoBack: (callback) => this.imageBrowserCallback(callback),
            });
        } else {
            showToast("Không có quyền truy cập camera");
            return;
        }
    }

    async pickCamera() {
        if (this.state.disable) return;
        const { status } = await Camera.getCameraPermissionsAsync();
        if (status.granted === false) {
            const { status: requestCameraStatus } =
                await Camera.requestCameraPermissionsAsync();
            if (requestCameraStatus !== "granted") {
                showToast("Không có quyền truy cập camera");
                return;
            }
        } else {
            let result = await ImagePicker.launchCameraAsync({});
            if (!result.cancelled) {
                let { imageUpload, imagesGallery } = this.state;
                this.setState({
                    imageUpload: [...imageUpload, result],
                    imagesGallery: [
                        ...imagesGallery,
                        ...convertImagesGallery([result]),
                    ],
                    imageChanged: true,
                });
            }
        }
    }

    imageBrowserCallback(callback) {
        if (callback === CONSTANTS.REJECT) {
            return;
        }

        let { imageUpload, imagesGallery } = this.state;

        callback
            .then((photos) => {
                this.setState({
                    imageUpload: [...imageUpload, ...photos],
                    imagesGallery: [
                        ...imagesGallery,
                        ...convertImagesGallery(photos),
                    ],
                    imageChanged: true,
                });
            })
            .catch((e) => null);
    }

    async deleteImgFunc(uri) {
        let { imagesGallery, imageUpload } = this.state;

        imagesGallery = imagesGallery.filter((data) => {
            return data.source.uri !== uri;
        });

        imageUpload = imageUpload.filter((data) => {
            return data.file !== uri;
        });

        this.setState({
            imageUpload: imageUpload,
            imagesGallery: imagesGallery,
        });
    }

    render = () => {
        let { imagesGallery } = this.state;
        let count = 1;
        let imageGroup = [];
        if (imagesGallery.length === 0)
            imageGroup.push(
                <TouchableOpacity
                    key={0}
                    style={[
                        tw.itemsCenter,
                        tw.justifyCenter,
                        tw.border,
                        tw.borderDashed,
                        {
                            width: (DEVICE_WIDTH - 40) / 3,
                            height: (DEVICE_WIDTH - 40) / 3,
                            borderColor: "#C1D7EE",
                            padding: 2,
                            borderRadius: THEMES.BORDER,
                        },
                    ]}
                    onPress={() => this.showActionSheet()}
                >
                    <View
                        style={[
                            tw.itemsCenter,
                            tw.justifyCenter,
                            tw.wFull,
                            tw.hFull,
                            {
                                backgroundColor: "#C1D7EE",
                                borderRadius: THEMES.BORDER,
                            },
                        ]}
                    >
                        <PlusIcon />
                        <Text style={tw.textWhite}>Chọn ảnh</Text>
                    </View>
                </TouchableOpacity>
            );
        else {
            for (let index = 0; index <= imagesGallery.length; index += 3) {
                imageGroup.push(
                    <View style={styles.imageGroup} key={index}>
                        {imagesGallery[index * count] && (
                            <TouchableOpacity
                                style={styles.image}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        VIEW_IMAGE_PAGE,
                                        {
                                            initialPage: index * count,
                                            images: imagesGallery,
                                            delImgFunc: this.delImgFunc,
                                            deleteImg: this.deleteImgFunc,
                                        }
                                    )
                                }
                            >
                                <Image
                                    style={{
                                        width: this.state.itemSize,
                                        height: this.state.itemSize,
                                        borderRadius: THEMES.BORDER,
                                    }}
                                    source={imagesGallery[index * count].source}
                                />
                            </TouchableOpacity>
                        )}
                        {imagesGallery[index * count + 1] && (
                            <TouchableOpacity
                                style={styles.image}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        VIEW_IMAGE_PAGE,
                                        {
                                            initialPage: index * count + 1,
                                            images: imagesGallery,
                                            delImgFunc: this.delImgFunc,
                                            deleteImg: this.deleteImgFunc,
                                        }
                                    )
                                }
                            >
                                <Image
                                    style={{
                                        width: this.state.itemSize,
                                        height: this.state.itemSize,
                                        borderRadius: THEMES.BORDER,
                                    }}
                                    source={
                                        imagesGallery[index * count + 1].source
                                    }
                                />
                            </TouchableOpacity>
                        )}
                        {imagesGallery[index * count + 2] && (
                            <TouchableOpacity
                                style={styles.image}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        VIEW_IMAGE_PAGE,
                                        {
                                            initialPage: index * count + 2,
                                            images: imagesGallery,
                                            delImgFunc: this.delImgFunc,
                                            deleteImg: this.deleteImgFunc,
                                        }
                                    )
                                }
                            >
                                <Image
                                    style={{
                                        width: this.state.itemSize,
                                        height: this.state.itemSize,
                                        borderRadius: THEMES.BORDER,
                                    }}
                                    source={
                                        imagesGallery[index * count + 2].source
                                    }
                                />
                            </TouchableOpacity>
                        )}
                        {index + 3 >= imagesGallery.length && (
                            <TouchableOpacity
                                style={[
                                    styles.image,
                                    tw.border,
                                    tw.borderDashed,
                                    {
                                        width: this.state.itemSize,
                                        height: this.state.itemSize,
                                        borderColor: "#C1D7EE",
                                        padding: 2,
                                        margin: 2,
                                        borderRadius: THEMES.BORDER,
                                    },
                                ]}
                                onPress={() => this.showActionSheet()}
                            >
                                <View
                                    style={[
                                        tw.itemsCenter,
                                        tw.justifyCenter,
                                        tw.wFull,
                                        tw.hFull,
                                        {
                                            backgroundColor: "#C1D7EE",
                                            borderRadius: THEMES.BORDER,
                                        },
                                    ]}
                                >
                                    <PlusIcon />
                                    <Text style={tw.textWhite}>Chọn ảnh</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            }
        }

        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <View style={styles.flatList}>{imageGroup}</View>
                <ActionSheet
                    id="actionSheet"
                    ref={this.actionSheetRef}
                    bounciness={3}
                >
                    <View style={{ paddingHorizontal: 13 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.actionSheetRef.current?.hide();
                                setTimeout(() => this.pickImage(), 10);
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignSelf: "center",
                                    margin: 12,
                                }}
                            >
                                <GalleryIcon />
                                <Text style={[tw.pX3, { color: PRIMARY }]}>
                                    Thư viện ảnh
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[tw.mY1, tw.hPx, {backgroundColor: "#EEF2FA"}]} />
                        <TouchableOpacity
                            onPress={() => {
                                this.actionSheetRef.current?.hide();
                                setTimeout(() => this.pickCamera(), 10);
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignSelf: "center",
                                    margin: 12,
                                }}
                            >
                                <CameraIcon />
                                <Text style={[tw.pX3, { color: PRIMARY }]}>
                                    Máy ảnh
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[tw.mY1, tw.hPx, {backgroundColor: "#EEF2FA"}]} />
                        <View style={{ margin: 12 }}>
                            <Button
                                style={tw.roundedFull}
                                onPress={() => {
                                    this.actionSheetRef.current?.hide();
                                }}
                            >
                                <Text>HUỶ</Text>
                            </Button>
                        </View>
                    </View>
                </ActionSheet>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    imageGroup: { flexDirection: "row" },
    flatList: { flex: 1, marginTop: 5 },
    image: { padding: 2, borderRadius: THEMES.BORDER },
});
