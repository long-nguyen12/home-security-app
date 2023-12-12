import { Modal, Text } from "@ui-kitten/components";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { tw } from "react-native-tailwindcss";
import { useSelector } from "react-redux";
import WarningIcon from "../../assets/icons/ico_warning.svg";
import LoadingService from "../../components/Loading/LoadingService";
import { API } from "../../constants";
import { PRIMARY } from "../../constants/colors";
import { APP_AUTH, LOGIN_PAGE, THONGBAO_CHITIET } from "../../constants/routes";
import { getCanhBao } from "../../epics-reducers/services/canhbaoServices";
import { timeFormatter } from "../../helper/dateFormat";
import { containerStyles } from "../../stylesContainer";
import Loader from "../App/Loader";

const LOAD_STATUS = {
  NONE: 0,
  IDLE: 1,
  FIRST_LOAD: 2,
  LOAD_MORE: 3,
  PULL_REFRESH: 4,
  ALL_LOADED: 5,
};

let page = 0;

function getPage() {
  return page;
}

function setPage(newPage) {
  page = newPage;
}

export default function ThongbaoPage(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Cảnh báo",
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

  const [docs, setDocs] = useState([]);
  const [loadStatus, setLoadStatus] = useState(LOAD_STATUS.NONE);
  const [loading, setLoading] = useState(false);
  let flatList = null;

  useEffect(() => {
    onGetFirstLoad();
  }, []);

  const user = useSelector((state) => state.auth);

  async function onGetRecords() {
    setLoading(true);
    let canhbao = await getCanhBao(page, 10);
    setLoading(false);
    if (canhbao && canhbao.data) {
      return canhbao;
    }
    return null;
  }

  const onGetPullRefresh = async () => {
    setPage(0);
    const response = await onGetRecords();
    if (!response) {
      setDocs([]);
      return;
    }
    const { data } = response;
    setPage(getPage() + 1);
    setDocs(data);
  };

  const onGetFirstLoad = async () => {
    setLoadStatus(LOAD_STATUS.FIRST_LOAD);
    setPage(0);
    const response = await onGetRecords();
    if (!response) {
      setDocs([]);
      return;
    }
    const { data } = response;
    setPage(getPage() + 1);
    setLoadStatus(LOAD_STATUS.IDLE);
    setDocs(data);
  };

  const onLoadMore = () => {
    if (loadStatus === LOAD_STATUS.IDLE) {
      if (flatList && flatList._listRef._scrollMetrics.offset > 1) {
        onGetLoadMore();
      }
    }
  };

  const onGetLoadMore = async () => {
    setLoadStatus(LOAD_STATUS.LOAD_MORE);
    const response = await onGetRecords();
    if (!response) {
      setDocs([]);
      return;
    }
    const { data } = response;
    setPage(getPage() + 1);
    setDocs(data.length && data.length > 0 ? [...docs, ...data] : docs);
    setLoadStatus(data.length > 0 ? LOAD_STATUS.IDLE : LOAD_STATUS.ALL_LOADED);
  };

  const renderSeparator = () => {
    return <View style={[tw.mY3, tw.hPx, tw.bgGray300]} />;
  };

  function renderCanhBao({ item, index }) {
    let imgUrl = "1699669482.jpg";
    return (
      <TouchableOpacity
        style={[tw.pX4]}
        onPress={() => {
          props.navigation.navigate(THONGBAO_CHITIET, {
            data: item,
          });
        }}
        key={index}
      >
        <View style={[tw.flexRow, tw.itemsCenter]}>
          <WarningIcon style={tw.mR1} />
          <Text style={[tw.fontBold, tw.textJustify, tw.flex1]}>
            Phát hiện đối tượng trong vùng theo dõi
          </Text>
        </View>
        <Text style={{ color: "#878787" }}>
          {timeFormatter(item.created_at)}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[containerStyles.content]}>
      <Modal visible={loading} backdropStyle={styles.backdrop}>
        <Loader />
      </Modal>
      <FlatList
        ref={(c) => (flatList = c)}
        contentContainerStyle={[tw.p4]}
        data={docs}
        renderItem={renderCanhBao}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
        // ListEmptyComponent={renderEmpty}
        refreshing={loadStatus === LOAD_STATUS.PULL_REFRESH}
        onRefresh={onGetPullRefresh}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        // ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
