import axios from "axios";
import { API } from "../../constants/api";
import { COMMON_APP } from "../../constants/common";

export function postFile(data) {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return axios
    .post(`${COMMON_APP.HOST_API}${API.UPLOAD_API}`, data, config)
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      return null;
    });
}

export function postCoords(data) {
  return axios
    .post(`${COMMON_APP.HOST_API}${API.POLYGON_API}`, data)
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      return null;
    });
}
