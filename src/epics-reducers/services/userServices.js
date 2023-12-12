import axios from "axios";
import { COMMON_APP } from "../../constants/common";
import { API } from "../../constants/api";

export function userRegister(data) {
  const url = `${COMMON_APP.HOST_API}${API.USER_DANGKY}`;
  console.log(url)
  return axios
    .post(url, data)
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

export function userLogin(data) {
  const url = `${COMMON_APP.HOST_API}${API.USER_DANGNHAP}`;
  return axios
    .post(url, data)
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export function userData(token) {
  const url = `${COMMON_APP.HOST_API}${API.USERS_ME}`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

export function userDeviceToken(data) {
  const url = `${COMMON_APP.HOST_API}${API.DEVICE_TOKEN_API}`;

  return axios
    .post(url, data)
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
