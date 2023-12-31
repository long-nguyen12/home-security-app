import axios from "axios";
import { COMMON_APP, API, CONSTANTS } from "../../constants";

export function getSettings() {
    return axios
        .get(`${COMMON_APP.HOST_API}${API.SETTINGS}`)
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