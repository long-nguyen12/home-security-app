import axios from "axios";
import { API, COMMON_APP } from "../../constants";

export function getAllCamera(route, page, limit, query) {
  query = query ? query : "";
  return axios
    .get(`${COMMON_APP.HOST_API}${route}`.format(query))
    .then((res) => {
      if (res.data) return res.data;
      else return null;
    })
    .catch((err) => {
      return null;
    });
}
export function addNewCamera(data) {
  const url = `${COMMON_APP.HOST_API}${API.CAMERA_ADD_API}`;
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
