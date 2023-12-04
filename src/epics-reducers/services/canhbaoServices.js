import axios from "axios";
import { API, COMMON_APP } from "../../constants";

export function getCanhBao(page, limit, query) {
  query = query ? query : "";
  return axios
    .get(
      `${COMMON_APP.HOST_API}${API.NOTIFICATION_API}`.format(page, limit, query)
    )
    .then((res) => {
      if (res.data) return res.data;
      else return null;
    })
    .catch((err) => {
      return null;
    });
}


export function getHistory(page, limit, query) {
  query = query ? query : "";
  return axios
    .get(
      `${COMMON_APP.HOST_API}${API.HISTORY_API}`.format(page, limit, query)
    )
    .then((res) => {
      if (res.data) return res.data;
      else return null;
    })
    .catch((err) => {
      return null;
    });
}
