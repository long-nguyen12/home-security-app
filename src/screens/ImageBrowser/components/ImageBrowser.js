import React from "react";
import { FlatList} from "react-native";
import {ImageBrowser as RNImageBrowser} from "../../base/expoMultipleImagepicker/src/index";
import { Text } from "@ui-kitten/components";

export default class ImageBrowser extends RNImageBrowser {
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (JSON.stringify(nextState.selected) != JSON.stringify(this.state.selected)) {
      if (this.props.onSelectImage) this.props.onSelectImage(nextState.selected);
    }
  }

  renderEmpty = () => {
    return (
      <Text style={{
        margin: 10,
        alignSelf: 'center'
      }}>
        Vui lòng chờ
      </Text>
    )
  }

  renderHeader = () => {
    return null
  }

  renderImages() {
    return (
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        onEndReached={() => {this.getPhotos()}}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={this.renderEmpty()}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    )
  }
}